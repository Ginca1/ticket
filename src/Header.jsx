import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const isAdmin = sessionStorage.getItem('role') === 'admin';
console.log('Is Admin:', isAdmin);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost/Biletes/bilete/src/php/check_auth.php', {
          method: 'GET',
          credentials: 'include',
        });
    
        const data = await response.json();
    
        console.log('Authentication check response:', data);
    
        if (response.ok && data.success) {
          setAuthenticated(true);
          setUsername(data.username);
    
          // Check if the user is an admin
          const isAdminUser = data.role === 'admin';
          sessionStorage.setItem('role', isAdminUser ? 'admin' : 'user');
        } else {
          setAuthenticated(false);
          setUsername('');
          sessionStorage.removeItem('role'); // Remove the role from sessionStorage
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };
    
  
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost/Biletes/bilete/src/php/logout.php', {
        method: 'GET',
        credentials: 'include',
      });
  
      setAuthenticated(false);
      setUsername('');
      sessionStorage.removeItem('role'); // Remove the role from sessionStorage
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
    <div className="header">
      <div style={{ justifyContent: 'space-between', padding: '10px' }} className="row">
        <Link to="/">
          <h1 style={{ color: 'white', cursor: 'pointer' }}>LOGO</h1>
        </Link>
        <div className="head-box-butt">
          <div style={{ justifyContent: 'space-between', height: '100%' }} className="row">
            {authenticated ? (
              isAdmin ? (
                // When logged in as admin
                <>
                  <h3 style={{ color: 'white', cursor: 'pointer' }}>Add event</h3>
                  <h3 style={{ color: 'white', cursor: 'pointer' }}>{username}</h3>
                  <button className='head-button' onClick={handleLogout}>Log out</button>
                </>
              ) : (
                // When logged in as user
                <> 
                  <h3 style={{ color: 'white', cursor: 'pointer' }}>{username}</h3>
                  <button className='head-button' onClick={handleLogout}>Log out</button>
                </>
              )
            ) : (
              // When not authenticated
              <>
                <Link to="/register">
                  <button className='head-button'>Sign up</button>
                </Link>
                <Link to="/register">
                  <button className='head-button' style={{ background: 'transparent', border: '1px solid white' }}>Log in</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="search-box">
          <div style={{ height: '100%' }} className="row">
            <div className="head-search-box">
              <div style={{ height: '100%', justifyContent: 'space-between' }} className="row">
                <input className='input-search' placeholder='Search by Event, Artist, Venue...' />
                <input type="date" className='input-date' placeholder='Date' />
                <button className='search-button'>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Header;
