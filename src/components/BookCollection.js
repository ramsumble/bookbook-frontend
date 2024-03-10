import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './Cards';
import '../styles/bookCollection.css'
import Samburger from "./Hamburger";

const BookCollection = () => {
    const [bookCollection, setBookCollection] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
                // console.log('Entire Response:', response.data);

                // Update the bookCollection state with the data from the response
                setBookCollection(response.data);
                
            } catch (error) {
            console.error('Error fetching book collection:', error.response?.data || error.message);
            }
    };

  fetchBookCollection();
}, []);
    //Filter through users books in the collection
    const filteredBooks = bookCollection.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <div>
          <div className="header">
            <div className="row1"><h2>My Bookshelf</h2></div>
            <div className="row2">
              <div className="Booksearch-container">
                <h2>Search your collection</h2>
                <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
                <div className="hamburger-container">
                    <Samburger />
                </div>
            </div>
          </div>
          <div className="boarder"></div>
          {bookCollection.length === 0 ? (
            <p>Your collection is empty. Start adding books!</p>
          ) : (
            <div className="body">
                <div className="card-container">
                {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
              </div>
            </div>
          )}
        </div>
      </>
    );
};

export default BookCollection;