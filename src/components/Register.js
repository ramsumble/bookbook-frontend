import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/register.css"

const registerUrl = process.env.REACT_APP_REGISTER_URL;


const RegistrationForm = () => {
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
        
        toast.success('User registered successfully');
      } else {
        console.log("Env file is: " + registerUrl)
        toast.error('Registration failed');
      }
    } catch (error) {
        toast.error('Error during registration');
    }
  };

  return (
    <form className='form-data' onSubmit={handleFormSubmit}>
        <div className='form-container'>
            <div className='register-container'>
                <h2>Create Account</h2>
                <input type="text" placeholder="Username" onChange={handleInputChange} />
                <input type="email" placeholder="Email" onChange={handleInputChange} />
                <input type="password" placeholder="Password" onChange={handleInputChange} />
                <button type="submit">Register</button>
                <p>link for login page</p>
            </div>
            <div className="redundant-container">
            </div>
            <div className="image-container"></div>
        </div>
    </form>
  );
};

export default RegistrationForm;
