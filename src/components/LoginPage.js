import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        alert("Login successfull!!")
        // Navigate to another page or save token
      } else {
        alert("Login failed!!!")
        console.error('Login failed:', data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  

  return (
   <div className='d-flex justify-center align-middle flex-1'>
     <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="login-btn">Login</button>
      </form>

      <div className="forgot-password">
        {/* Use navigate() to navigate to Forgot Password page */}
        <span 
          className="forgot-password-link" 
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </span>
        
        {/* Use navigate() to navigate to Create Account page */}
        <span 
          className="create-account-link" 
          onClick={() => navigate('/create-account')}
        >
          Create Account
        </span>
      </div>
    </div>  
   </div>
  );
};

export default LoginPage;
