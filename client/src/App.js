import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { useRoutes } from './routes';
import {AuthContext} from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';


function App() {

  const { login, logout, token, userId } = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin); 

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isLogin }}>
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        {routes}
      </BrowserRouter>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
