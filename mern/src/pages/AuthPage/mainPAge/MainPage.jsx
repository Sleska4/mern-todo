import axios from 'axios';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { AuthContext } from './../../../context/AuthContext';

import './mainPage.scss';


const MainPage = () => {
    const [text, setText] = useState('');
    const {userId} = useContext(AuthContext);
    const [todos, setTodos] = useState([]);

    const getTodo = useCallback(async () => {
        try {
            await axios.get('/api/todo', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then ((response) => setTodos(response.data))

        } catch(err){
            console.log(err)
        }
    }, [userId])

    const createTodo = useCallback(async () => {
        if(!text) {
            alert('Вы не ввели текст!');
            return
        }
        try{
            await axios.post('/api/todo/add', {text, userId}, {
            headers: {
                'Content-Type': 'application/json'
            }})
            .then((res) => {
                setTodos([...todos], res.data);
                setText('')
                getTodo()
            })
        } catch(err){
            console.log(err)
        }
    }, [text, userId, todos, getTodo])

    const removeTodos = useCallback(async (id) => {
        try{
            await axios.delete(`/api/todo/delete/${id}`, {id}, {
                headers: {'Content-Type': 'aplication/json'}
            })
            .then(() => getTodo());
        } catch(err){
            console.log(err)
        }
    }, [getTodo])

    const importantTodo = useCallback(async (id) => {
        try{
            await axios.put(`/api/todo/important/${id}`, {id}, {
                headers: {'Content-Type': 'aplication/json'}
            })
            .then(() => getTodo());
        } catch(err){
            console.log(err)
        }
    }, [getTodo])

    const complitedTodo = useCallback(async (id) => {
        try{
            await axios.put(`/api/todo/complited/${id}`, {id}, {
                headers: {'Content-Type': 'aplication/json'}
            })
            .then(() => getTodo());
        } catch(err){
            console.log(err)
        }
    }, [getTodo])    

    useEffect(() => {
            getTodo()
    })
    
    return (
        <div className="container">
           <div className="main-page">
               <h4>Добавить задачу</h4>
               <form 
                action=""
                className="form form-login"
                onSubmit={(e) => {e.preventDefault()}}
                >
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="text"
                                name="input"
                                className="validate"
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                            />
                        <label htmlFor="input">Задача</label>
                    </div>
                 </div>
                 <div className="row">
                     <button
                     className="waves-effect waves-light btn blue"
                     onClick={createTodo}
                     >Добавить</button>
                 </div>
               </form>
               <h3>Активные задачи</h3>
               <div className="todos"
               >
               {
                   todos.map((todo, index) => {
                       const important = todo.important ? 'important' : '';
                       const complited = todo.complited ? 'complited' : '';
                       return(
                            <div className={"row flex todos-item " + complited + important} key={index}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-buttons">
                                        <i className="material-icons blue-text"
                                            onClick={() => complitedTodo(todo._id)}
                                        >check</i>
                                        <i className={"material-icons orange-text "}
                                            onClick={() => importantTodo(todo._id)}
                                        >warning</i>
                                        <i className="material-icons red-text"
                                            onClick={() => removeTodos(todo._id)}
                                        >delete</i>
                                    </div>
                            </div>
                   )
                   })
               }
               </div>
           </div>
        </div>
    );
}

export default MainPage;
