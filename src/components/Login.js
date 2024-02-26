import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "../styles/login.css"


const loginURL = process.env.REACT_APP_LOGIN_URL;


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    // const onButtonPress = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    //   };
      
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
                
            const { token } = response.data;

            // store token to local storage
            localStorage.setItem('token', token);

            // redirect after logging in
            navigate('/search');

        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    return (
        <form className='login-form-data' onSubmit={handleLogin}>
            <div className='login-form-container'>
                <div className='redundant-login-container'>
                </div>
                <div className="login-container">
                    <h2>Log in :)</h2>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="button" onClick={handleLogin}>Login</button>
                    <p>link for register page</p>
                </div>
                <div className="login-image-container"></div>
            </div>
        </form>
      );
    };

export default LoginForm;