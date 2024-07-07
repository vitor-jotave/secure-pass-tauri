// src/components/Login.tsx
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
