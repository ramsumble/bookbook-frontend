import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddtoCollectionIcon.css'

const CollectionIcon = ({ bookData }) => {
  const [isIconOn, setIsIconOn] = useState(false);

  const handleIconClick = async () => {
    try {
        // Toggle the icon state
        setIsIconOn((prevIsIconOn) => !prevIsIconOn);

      const userId = localStorage.getItem('userId');

    //   console.log('Book Data:', bookData); 
    //   console.log('User ID:', userId);

    //   console.log('Data to be sent:', { userId, bookData: { title: bookData.title, author: bookData.author } });

      // Send a request to the backend to add the book to the user's collection
      await axios.post(
        `${process.env.REACT_APP_COLLECTIONS_URL}`,
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
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className="center" onClick={handleIconClick}>
        <label className="label">
          <input className="label__checkbox" type="checkbox" />
          <span className="label__text">
            <span className="label__check">
              <i className={`fa fa-check icon ${isIconOn ? 'checked' : ''}`}></i>
            </span>
          </span>
        </label>
      </div>
    </>
  );
};

export default CollectionIcon;