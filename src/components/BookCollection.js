import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './Cards';

const BookCollection = () => {
    const [bookCollection, setBookCollection] = useState([]);

    useEffect(() => {
        // Fetch the user's book collection from the backend
        const fetchBookCollection = async () => {
            try {
                const token = localStorage.getItem('token');
            
                const response = await axios.get(process.env.REACT_APP_USER_COLLECTIONS_URL, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                console.log('Entire Response:', response.data);

                // Update the bookCollection state with the data from the response
                setBookCollection(response.data);
                
            } catch (error) {
            console.error('Error fetching book collection:', error.response?.data || error.message);
            }
    };

  fetchBookCollection();
}, []);

    return (
        <div>
        <h2>Your Book Collection</h2>
        {bookCollection.length === 0 ? (
            <p>Your collection is empty. Start adding books!</p>
        ) : (
            <div className="card-container">
            {bookCollection.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
            </div>
        )}
        </div>
    );
};

export default BookCollection;