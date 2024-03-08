import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FavIcon.scss'

const FavIcon = ({ bookData }) => {
  const [isIconOn, setIsIconOn] = useState(false);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_USER_FAVOURITES_URL, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`, 
          }
        });
        const userFavorites = response.data;
        
        const isBookInFavorites = userFavorites.some(
          (favourite) => favourite.title === bookData.title && favourite.author === bookData.author
        );

        setIsIconOn(isBookInFavorites);
      } catch (error) {
        console.error('Error fetching user favourites:', error);
      }
    };

    fetchUserFavorites();
  }, [bookData]);

  const handleIconClick = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const requests = [
        axios.post(
          process.env.REACT_APP_USER_FAVOURITES_URL,
          { userId, bookData },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          }
        ),
        axios.post(
          process.env.REACT_APP_COLLECTIONS_URL,
          { userId, bookData },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          }
        ),
      ]

      await Promise.all(requests);


      // Update the state so icon remains on if book is in relevant collection
      setIsIconOn(true);
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

export default FavIcon;