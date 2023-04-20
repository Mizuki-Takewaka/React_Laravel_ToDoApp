import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [inputTitle, setinputTitle] = useState('');

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
                setTasks(taskData);
            })
            .catch(() => {
                console.log('通信に失敗しました');
        });
    }

    //フォームに入力時
    const handleOnChange = (event) => {
        setinputTitle( event.target.value )
    }
    
    //追加ボタン押下時
    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputTitle === '') return;

        axios
        .post('http://localhost/api/tasks', {
            title: inputTitle,
        })
        .then(
            // console.log(response)
        )
        // setTasks(tasks => [...tasks, task?])
        // setTask('')
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">
                            <p>タスク管理</p>
                            <p>{dateAndTime}</p>
                            <a href="/"><button type="button" className="btn btn-primary">Homeに遷移ボタン</button></a>
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
                                         <input className="form-check-input me-1" type="checkbox" value="" aria-label="..."></input>
                                        { task.title }
                                        <button type="button" className="btn btn-outline-dark btn-sm">×</button>
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
