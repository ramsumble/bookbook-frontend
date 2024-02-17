import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle the search button click
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`, {
        params: { searchTerm },
      });

      // update the parent component state with the search results
      setSearchResults(response.data);

      // pass the search results to the parent component
      onSearchResults(response.data);
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
    </div>
  );
};

export default BookSearch;