import { useContext } from 'react';
import './Navbar.scss';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  const { logout, isLogin } = useContext(AuthContext)

  return (
    <nav className='z-depth-4'>
    <div className="nav-wrapper navbar blue">
      <Link to="/" className="brand-logo">MERN Todo App</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {isLogin ? 
         <li onClick={logout}><Link to="/">Выйти</Link></li> : 
         <li><Link to="/login">Войти</Link></li>
        }
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;