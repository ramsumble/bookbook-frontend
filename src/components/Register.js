import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <form onSubmit={handleFormSubmit}>
      <label>
        Username:
        <input type="text" name="username" onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
