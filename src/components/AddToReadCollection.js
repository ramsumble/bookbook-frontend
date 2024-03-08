import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FavIcon.scss'

const FavIcon = ({ bookData }) => {
  const [isIconOn, setIsIconOn] = useState(false);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_USER_READLIST_URL, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`, 
          }
        });
        const userReading = response.data;
        
        const isBookInReading = userReading.some(
          (reading) => reading.title === bookData.title && reading.author === bookData.author
        );

        setIsIconOn(isBookInReading);
      } catch (error) {
        console.error('Error fetching user favourites:', error);
      }
    };

    fetchUserFavorites();
  }, [bookData]);

  const handleIconClick = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');  

      if (isIconOn) {
        // Book is already in collection, remove it
        const removeFromReadingResponse = await axios.delete(
          process.env.REACT_APP_USER_READLIST_URL,
          {
            headers: {
              Authorization: `${token}`,
            },
            data: {
              bookData: { _id: bookData._id }, 
            },
          }
        );
  
        console.log('Remove from favorites response:', removeFromReadingResponse.data);

      } else {    
        const requests = [
          axios.post(
            process.env.REACT_APP_USER_READLIST_URL,
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
      }

      // Update the state so icon remains on if book is in relevant collection
      setIsIconOn(!isIconOn);
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