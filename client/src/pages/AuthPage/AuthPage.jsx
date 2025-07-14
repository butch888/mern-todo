import React, { useContext, useState } from "react";
import { Link, useNavigate } from'react-router-dom';
import './AuthPage.scss'
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AuthPage = ({type}) => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '', 
    password: ''
  });

  const {login} = useContext(AuthContext)

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      
      await axios.post('/api/auth/registration', {...form}, {headers: { 'Content-Type': 'application/json' }})
      .then(response => alert(response.data.message));
      setForm({
        email: '', 
        password: ''
      });
      navigate('/login', {replace: true})

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  }

  const loginHandler = async () => {

    try {

      await axios.post('/api/auth/login', {...form}, {headers: { 'Content-Type': 'application/json' }})
      .then(response => {login(response.data.token, response.data.userId)});
      
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        setForm({
          email: '', 
          password: ''
        });
      }
      console.log(error);
    }
  }
  
  return (
    <div className="container">
        <div className="auth-page">
        {type ==='login'? (
          <>
          <h3>Авторизация</h3>
          <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="input-field col s12">
                <input 
                  id="email" 
                  type="email" 
                  name="email"
                  autoComplete="email"
                  className="validate"
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input 
                  id="password"
                  type="password" 
                  name="password"
                  autoComplete="current-password"                  
                  className="validate"
                  value={form.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <button className="waves-effect waves-light btn blue" onClick={loginHandler}>
                Войти
              </button>
              <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта?</Link>
            </div>
          </form>
        </>
        ) : type === 'registration' ? (
          <>
                <h3>Регистрация</h3>
                <form className="form form-register" onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input 
                        id="email" 
                        type="email" 
                        name="email"
                        autoComplete="email"
                        className="validate"
                        onChange={handleChange}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input 
                        id="password"
                        type="password" 
                        name="password"
                        autoComplete="new-password"                  
                        className="validate"
                        onChange={handleChange}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button className="waves-effect waves-light btn blue" onClick={registerHandler}>
                      Зарегистрироваться
                    </button>
                    <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
                  </div>
                </form>
              </> ) : 'null}' }
        

              
        </div>
      </div>
  );
};

export default AuthPage;