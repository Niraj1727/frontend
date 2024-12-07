import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [loading, setLoading] = useState(false); // Show loading indicator
  const [errorMessage, setErrorMessage] = useState(''); // Custom error message
  const navigate = useNavigate();

  // Form-based login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(''); // Clear previous error messages

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
      console.error(err?.response?.data || err.message);
      setErrorMessage(
        err?.response?.data?.message || 'An error occurred during login.'
      );
    } finally {
      setLoading(false); // Stop loading
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
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="register-link">Register here</Link>
        </p>
        <p>
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
