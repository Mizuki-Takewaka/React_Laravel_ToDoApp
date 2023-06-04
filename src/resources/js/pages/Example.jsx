import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef, createRef } from 'react';


function Example() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const dateAndTime = `${year}/${month}/${date} ${hour}:${minute}`;
    
    //taskリストをuseStateに格納
    const [tasks, setTasks] = useState([]);
    //入力値をuseStateに格納
    const [inputTitle, setInputTitle] = useState('');
    //編集時の入力値をrefで管理
    //mapで繰り返す分だけ、useRefを生成
    const modyfiedRefs = useRef([]);
    tasks.forEach((_, index) => {
        modyfiedRefs.current[index] = createRef()
    });

    //画面読み込み時、初期処理
    useEffect(() => {
        getTasksData();
    },[])

    //バックエンドからtasksの一覧を取得する処理
    const getTasksData = () => {
        axios
            .get('http://localhost/api/tasks')
            .then(response => {
                console.log(response.data);
                const taskData  = Object.values(response.data);
                //taskDataのarrryにmodifyMode:falseを追加
                const newTaskData = taskData.map((value,index)=> {
                    value["modifyMode"] = false;
                    return value;
                });
                setTasks(newTaskData);
            })
            .catch(() => {
                console.log('通信に失敗しました');
        });
    }

    //フォームに入力時
    const handleOnChange = (event) => {
        setInputTitle( event.target.value )
    }
    
    //追加ボタン押下時
    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputTitle === '') return;

        axios
        .post('http://localhost/api/tasks', {
            title: inputTitle,
        })
        .then((response) => {
            console.log(response);
            setTasks(tasks => [...tasks, response.data])
            setinputTitle('')
        })
        .catch(error => {console.log(error)});
    }

    //削除ボタン押下時
    const deleteTask = (id) => {
        console.log(`${id}を削除します`);
        axios
        .delete(`/api/tasks/${id}`)
        .then((response) => {
            console.log(response);
            setTasks(tasks.filter((task) => task.id !== id));
        })
        .catch(error => {console.log(error)});
    };

    //modifyModes[index]のstateを反転させる関数
    const classToggle = (id) => {
        const toddledTasks = tasks.map((value)=> {
            value.id==id ? value.modifyMode=!value.modifyMode : value
            return value;
        });
        setTasks(toddledTasks);
    }

    //編集ボタン押下時（編集モードに変更）
    const changeModifyMode = (id, index) => {
        classToggle(id);
        modyfiedRefs.current[index].current.focus();
    }

    //編集キャンセルボタン押下時（通常モードに変更）
    const cancelModifyMode = (id, title, index) => {
        classToggle(id);
        console.log(modyfiedRefs);
        //編集途中の値をリセット
        modyfiedRefs.current[index].current.value = title;
    }

    //編集確定ボタン押下時
    const confirmModifyTask = (id, index) => {
        const modifiedInputRef = modyfiedRefs.current[index].current.value; //編集入力値を代入
        console.log(`id:${id}を${modifiedInputRef}に編集します`);
        modyfiedRefs.current[index].current.focus();

        axios
        .patch(`/api/tasks/${id}`,{
            title: modifiedInputRef,
        })
        .then((response) => {
            console.log(response);
            //編集箇所を更新後の新arryで、state更新
            const newTasksArry = tasks.map((task)=> {
                task.id==id ? task.title=modifiedInputRef : task
                return task;
            });
            setTasks( newTasksArry );
            //通常表示モードにクラスを変更
            classToggle(id);
        })
        .catch(error => {console.log(error)});
    }
    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">
                            <p className='pagetitle'>タスク管理</p>
                            <p>{dateAndTime}</p>
                            <a href="/"><button type="button" className="btn btn-primary btn-sm">Homeに遷移ボタン</button></a>
                        </div>

                        <div className="card-body">
                            <form action="" onSubmit={handleSubmit}>
                                <div className="d-flex bd-highlight">
                                    <div className="p-2 flex-grow-1 bd-highlight">
                                        <input type="text" className="form-control" value={ inputTitle } onChange={handleOnChange}/>
                                    </div>
                                    <div className="p-2 bd-highlight">
                                        <button type="button submit" className="btn btn-outline-primary">追加</button>
                                    </div>
                                </div>
                            </form>

                            <ul className="list-group">
                                { tasks.map((task, index) => (
                                    <li key={ index } className="list-group-item">

                                        {/* 通常時の表示 (modifyMode:falseの時表示、trueの時display: none) */}
                                        <div className={ task.modifyMode ? "d-none" : ""} >
                                            <input className="form-check-input me-1" type="checkbox" value="" aria-label="..."></input>
                                            { task.title }
                                            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => deleteTask(task.id) }>×</button>
                                            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => changeModifyMode(task.id, index) }>編集</button>
                                        </div>
                                        
                                        {/* 編集時の表示 (modifyMode:trueの時表示、falseの時display: none)*/}
                                        <div className={task.modifyMode ? "" : "d-none"}>
                                            <input type="text" defaultValue={task.title} ref={modyfiedRefs.current[index]}/> 
                                            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => confirmModifyTask(task.id, index) }>編集確定</button>
                                            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => cancelModifyMode(task.id, task.title, index) }>編集キャンセル</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Example;

// if (document.getElementById('app')) {
//     const Index = ReactDOM.createRoot(document.getElementById("app"));

//     Index.render(
//         <React.StrictMode>
//             <Example/>
//         </React.StrictMode>
//     )
// }
