import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './Authenticate';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/register.css"
import '../styles/button.scss'

const registerUrl = process.env.REACT_APP_REGISTER_URL;
const loginURL = process.env.REACT_APP_LOGIN_URL

const RegistrationForm = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Registration successful, now perform login
        const loginResponse = await fetch(loginURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const { token, userId } = await loginResponse.json();

          // Store login data to local storage
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);

          // Dispatch login action to update authentication state
          dispatch({ type: 'LOGIN', payload: { userId } });
          
          // Redirect after logging in 
          navigate('/search');
        } else {
          // Handle login failure after successful registration
          toast.error('Login after registration failed.');
        }
      } else {
        if (response.status === 400) {
          toast.error('Registration failed. Please fill in all fields.');
        } else {
          toast.error('An unknown error occurred during registration.');
        }
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('Error during registration:', error);
      toast.error('An unexpected error occurred during registration.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFormSubmit(e);
    }
  };

  return (
    <form className='form-data' onSubmit={handleFormSubmit}>
        <div className='form-container'>
            <div className='register-container'>
                <h2>Create Account</h2>

                <input type="text" placeholder="Username" name="username" onChange={handleInputChange} />
                <input type="email" placeholder="Email" name="email" onChange={handleInputChange} />
                
                <input type="password" 
                placeholder="Password" 
                name="password" 
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                />
                
                <button className='fill' type="submit">Register</button>

                <p>Already a member? <Link to="/" className='Register-link' >Login</Link> </p>

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
            </div>
            <div className="redundant-container">
            </div>
            <div className="image-container"></div>
        </div>
    </form>
  );
};

export default RegistrationForm;
