import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AddtoCollectionIcon.css'

const CollectionIcon = ({ bookData }) => {
  const [isIconOn, setIsIconOn] = useState(false);

  useEffect(() => {
    const fetchUserCollections = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_USER_COLLECTIONS_URL, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        });
        const userCollections = response.data;

        const isBookInCollections = userCollections.some(
          (collection) => collection.title === bookData.title && collection.author === bookData.author
        );

        setIsIconOn(isBookInCollections);
      } catch (error) {
        console.error('Error fetching users collection:', error);
      }
    };

    fetchUserCollections();
  }, [bookData]);

  const handleIconClick = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
  
      if (isIconOn) {
        // Book is already in favorites, remove it
        const removeFromCollectionResponse = await axios.delete(
          process.env.REACT_APP_COLLECTIONS_URL,
          {
            headers: {
              Authorization: `${token}`,
            },
            data: {
              bookData: { _id: bookData._id }, 
            },
          }
        );
    
        console.log('Remove from favorites response:', removeFromCollectionResponse.data);
      } else {
        await axios.post(
          process.env.REACT_APP_COLLECTIONS_URL,
          { userId, bookData: { title: bookData.title, author: bookData.author } },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setIsIconOn(!isIconOn);
      }
    } catch (error) {
      console.error('Error updating collection:', error.response?.data || error.message);
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

export default CollectionIcon;