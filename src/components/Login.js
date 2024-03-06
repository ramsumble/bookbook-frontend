import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/login.css"
import "../styles/button.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const loginURL = process.env.REACT_APP_LOGIN_URL;


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        loginURL,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, userId } = response.data;

      // Store login data to localstorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // console.log(userId)

      // Redirect after logging in
      navigate('/search');
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
  
      // Check if no details are provided
      if (error.response && error.response.status === 401) {
        errorMessage = 'Please check your email and password.';
      } else if (!email && !password) {
        errorMessage = 'No details provided';
      }
  
      console.error('Login error:', errorMessage);
  
      // Display a toast notification with the specific error message
      toast.error(`Login error: ${errorMessage}`);
    }
  }

    return (
        <form className='login-form-data' onSubmit={handleLogin}>
            <div className='login-form-container'>
                <div className='redundant-login-container'>
                </div>
                <div className="login-container">
                    <h2>Login :)</h2>
                    <input className="login-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button className='fill' type="button" onClick={handleLogin}>Login</button>
                    <ToastContainer 
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="light"
                    />
                    <p>Not a member? <Link to="/register" className='Register-link' >Sign up</Link> </p>
                    
                </div>
                <div className="login-image-container"></div>
            </div>
        </form>
      );
    };

export default LoginForm;