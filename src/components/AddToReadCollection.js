import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FavIcon.scss'

const ReadIcon = ({ bookData }) => {
  const [isIconOn, setIsIconOn] = useState(false);

  const handleIconClick = async () => {
    try {
        // Toggle the icon state
        setIsIconOn((prevIsIconOn) => !prevIsIconOn);

      const userId = localStorage.getItem('userId');

      console.log('Book Data:', bookData); 
      console.log('User ID:', userId);

      console.log('Data to be sent:', { userId, bookData: { title: bookData.title, author: bookData.author } });

      // Send a request to the backend to add the book to the user's collection
      await axios.post(
        `${process.env.REACT_APP_USER_READLIST_URL}`,
        { userId, bookData: { title: bookData.title, author: bookData.author } },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding book to collection:', error.response?.data || error.message);
    }
  };

  return (
    <div className={`star ${isIconOn ? 'starOn' : 'starOff'}`} onClick={handleIconClick}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polygon points="12,3 6,21 21,9 3,9 18,21" />
      </svg>
    </div>
  );
};

export default ReadIcon;