import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle the search button click
    const handleSearch = async () => {
      try {
        // console.log(process.env.REACT_APP_BACKEND_URL)
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`, {
          params: { searchTerm },
        });

        // Update the component state with the search results
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching books:', error);
      }
    };

    return (
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {/* Display the search results in a UL */}
        <ul>
          {searchResults.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>
      </div>
    );
  };

export default BookSearch;