import { useState, useContext, useCallback, useEffect } from 'react';
import './MainPage.scss'
import axios from 'axios';import { AuthContext } from '../../context/AuthContext';

const MainPage = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const {userId} = useContext(AuthContext)

  const getTodos = useCallback(async () => {
    try {
      await axios.get('/api/todo', { headers: { 'Content-Type': 'application/json' }, params: { userId } })
      .then(response => setTodos(response.data));
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);


  const createTodo = useCallback(async () => {
    try {
      if (!text) return;

      await axios.post('/api/todo/add', { text, userId }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => setTodos([...todos, response.data]));
      setText('');

    } catch (error) {
      console.error(error);
    }
  }, [text, userId, todos]);

  const deleteTodo = useCallback(async (id) => {
    try {
      await axios.delete(`/api/todo/delete/${id}`, { headers: { 'Content-Type': 'application/json' } })
      .then(() => getTodos());
    } catch (error) {
      console.error(error);
    }
  }, [getTodos]);

  const completeTodo = useCallback(async (id) => {
    try {
      await axios.put(`/api/todo/complete/${id}`, {id}, { headers: { 'Content-Type': 'application/json' } })
      .then(response => setTodos([...todos], response.data));
      getTodos();
      
    } catch (error) {
      console.error(error);
    }
  }, [getTodos, todos]);

  const importantTodo = useCallback(async (id) => {
    try {
      await axios.put(`/api/todo/important/${id}`, {id}, { headers: { 'Content-Type': 'application/json' } })
      .then(response => setTodos([...todos], response.data));
      getTodos();

    } catch (error) {
      console.error(error);
    }
  }, [getTodos, todos]);
  
   
  return (
    <div className="container">
      <div className="main-page">
        <h4>Добавить задачу</h4>
        <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input 
              type="text" 
              id="text" 
              name="input" 
              value={text}
              className="validate"
              onChange={(e) => setText(e.target.value)}
              />
              <label htmlFor="input">Название задачи</label>
            </div>
          </div>
          <div className="row">
            <button className="waves-effect waves-light btn blue" type="submit" onClick={createTodo}>Добавить</button>
          </div>
        </form>

        <h3>Активные задачи:</h3>
        <div className="todos">
          {todos.map((todo, index) => {
            return (
              <div className={`row flex todos-item ${todo.completed ? 'completed' : ''} ${todo.important ? 'important' : ''}`} key={index}>
                <div className="col todos-num">{index + 1}</div>
                <div className={"col todos-text"}>{todo.text}</div>
                <div className="col todos-buttons">
                  <i className="material-icons blue-text" onClick={() => completeTodo(todo._id)}>check</i>
                  <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                  <i className="material-icons red-text" onClick={() => deleteTodo(todo._id)}>delete</i>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainPage;