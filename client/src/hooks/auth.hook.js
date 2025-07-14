import { useEffect, useState, useCallback } from "react";

export const useAuth = () => {

  
  const [token, setTtoken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setTtoken(jwtToken);
    setUserId(id);
    localStorage.setItem('userData', JSON.stringify({ userId: id, token: jwtToken }));
  }, []);

  const logout = () => {
    setTtoken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login])

  return { login, logout, token, userId };
}

