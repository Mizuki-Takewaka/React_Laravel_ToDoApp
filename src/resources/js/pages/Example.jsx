import React from 'react';
import { useState } from 'react';

function Example() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const dateAndTime = `${year}/${month}/${date} ${hour}:${minute}`;

    //todoリストをuseStateに格納
    const [todos, setTodos] = useState([]);
    //入力値をuseStateに格納
    const [task, setTask] = useState('');

    const handleOnChange = (event) => {
        setTask( event.target.value )
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if(task === '') return
        setTodos(todos => [...todos, task])
        setTask('')
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <p>タスク管理</p>
                            <p>{dateAndTime}</p>
                            <a href="/"><button type="button" className="btn btn-primary">Homeに遷移ボタン</button></a>
                        </div>

                        <div className="card-body">
                            <form action="" onSubmit={handleSubmit}>
                                <div class="d-flex bd-highlight">
                                    <div class="p-2 flex-grow-1 bd-highlight">
                                        <input type="text" class="form-control" value={ task } onChange={handleOnChange}/>
                                    </div>
                                    <div class="p-2 bd-highlight">
                                        <button type="button submit" className="btn btn-outline-primary">追加</button>
                                    </div>
                                </div>
                            </form>

                            <ul>
                                { todos.map((todo, index) => (
                                    <li key={ index }>
                                        {
                                        todo
                                        }
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="btn btn-outline-danger">削除</button>
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
