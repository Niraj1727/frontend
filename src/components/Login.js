import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Form-based login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://api.acezy.site/api/auth/login', {
        email,
        password,
      });

      console.log('User logged in:', res.data);

      // Save token, userId, and trialStartTime in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('trialStartTime', res.data.user.trialStartTime);

      alert('Login successful!');
      navigate('/subjects');
    } catch (err) {
      console.error(err.response.data);
      alert('Error during login: ' + err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register" className="register-link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
