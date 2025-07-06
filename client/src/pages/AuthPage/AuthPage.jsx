import React from "react";
import './AuthPage.scss'
import { Link, Route, Routes } from'react-router-dom';

const LoginForm = () => (
  <>
    <h3>Авторизация</h3>
    <form className="form form-login">
      <div className="row">
        <div className="input-field col s12">
          <input 
            id="email" 
            type="email" 
            name="email"
            autoComplete="email"
            className="validate"
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
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <button className="wawes-effect wawes-light btn blue">
          Войти
        </button>
        <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта?</Link>
      </div>
    </form>
  </>
);

const RegisterForm = () => (
  <>
    <h3>Регистрация</h3>
    <form className="form form-register">
      <div className="row">
        <div className="input-field col s12">
          <input 
            id="email" 
            type="email" 
            name="email"
            autoComplete="email"
            className="validate"
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
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <button className="wawes-effect wawes-light btn blue">
          Зарегистрироваться
        </button>
        <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
      </div>
    </form>
  </>
);
const AuthPage = () => {
  return (
    <div className="container">
        <div className="auth-page">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registration" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
  );
};

export default AuthPage;