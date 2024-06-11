import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const Register = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/Biletes/bilete/src/php/users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (data.success) {
        setSignupSuccess('User registered successfully.');
        setSignupError('');
      } else {
        setSignupError('User registration failed.');
        setSignupSuccess('');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }

    if (signupData.username.length < 3 || signupData.username.length > 15) {
      setSignupError('Username must be between 3 and 15 characters.');
      setSignupSuccess('');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupData.email)) {
      setSignupError('Invalid email address.');
      setSignupSuccess('');
      return;
    }

    if (signupData.password.length < 9) {
      setSignupError('Password must be at least 9 characters long.');
      setSignupSuccess('');
      return;
    }

    console.log('Signup form submitted:', signupData);
    setSignupSuccess('Sign up successful!');
    setSignupError('');
  };

  /* login */
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [showSignup, setShowSignup] = useState(true);

  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    try {
      console.log('Login data to be sent:', loginData);

      const response = await fetch('http://localhost/Biletes/bilete/src/php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      console.log('Full response from server:', response);

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      console.log('Response from server:', data);

      if (data.success) {
        // Redirect to Home component using history
        navigate('/');
      } else {
        setLoginError(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Error during login. Please try again.');
    }
  };

  const toggleForm = () => {
    setShowSignup(!showSignup);
  };

  

  return (
    <>
      <div className="main">
        <div style={{ height: '170px' }} className="header">
          <div style={{ justifyContent: 'space-between', padding: '10px' }} className="row">
            <Link to="/">
              <h1 style={{ color: 'white', cursor: 'pointer' }}>LOGO</h1>
            </Link>
            <div className="head-box-butt">
              <div style={{ justifyContent: 'space-between', height: '100%' }} className="row">
               
                  <button className='head-button'>Sign up</button>
                
                
                  <button className='head-button' style={{ background: 'transparent', border: '1px solid white' }}>Log in</button>
               
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2%' }} className="row">
          {showSignup ? (
            <div className="sign-up-container">
              <div className="row">
                <h2>Sign Up</h2>
              </div>
              <form onSubmit={handleSignupSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                </div>
                <div className="row">
                  <p style={{ color: 'red' }}>{signupError}</p>
                  <p style={{ color: 'green' }}>{signupSuccess}</p>
                </div>
                <button style={{ marginTop: '2%' }} type="submit">Sign Up</button>
              </form>
              <div style={{ marginTop: '3%', justifyContent: 'left' }} className="row">
                <p style={{ cursor: 'pointer' }} onClick={toggleForm}>
                  Already have an account? Log in
                </p>
              </div>
            </div>
          ) : (
            <div className="login-container">
              <div className="row">
                <h2>Login</h2>
              </div>
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="row">
                  <p style={{ color: 'red' }}>{loginError}</p>
                  <p style={{ color: 'green' }}>{loginSuccess}</p>
                </div>
                <button type="submit">Login</button>
              </form>
              <div style={{ marginTop: '3%', justifyContent: 'left' }} className="row">
                <p style={{ cursor: 'pointer' }} onClick={toggleForm}>
                  Don't have an account? Sign up
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;