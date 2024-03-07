import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadingCollection = () => {
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    // Fetch the user's reading collection from the backend
    const fetchReadingCollection = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(process.env.REACT_APP_USER_READLIST_URL, {
          headers: {
            Authorization: `${token}`,
          },
        });

        // Update the bookCount state with the count of books in the reading collection
        setBookCount(response.data.length);
      } catch (error) {
        console.error('Error fetching reading collection:', error.response?.data || error.message);
      }
    };

    fetchReadingCollection();
  }, []);

  return (
    <div>
      <h2>Reading Collection</h2>
      <p>Number of Books: {bookCount}</p>
    </div>
  );
};

export default ReadingCollection;