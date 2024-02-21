import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/register.css"
import imageSrc from "../images/f182a449-67bf-4638-83ed-288265a26571.png";

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
          <h1>Create Account</h1>
          <input type="text" placeholder="Username" onChange={handleInputChange} />
          <input type="email" placeholder="Email" onChange={handleInputChange} />
          <input type="password" placeholder="Password" onChange={handleInputChange} />
          <button type="submit">Register</button>
        </div>
        <div className="sign-in-container">
          <h1>Existing Account?</h1>
          <button type="submit">Sign in</button>
          {/* <img src={imageSrc} alt="something" className="right-image"></img> */}
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
