import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import "../styles/booksearch.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookSearch = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line 
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle the search button click
  const handleSearch = async () => {
    try {
      toast.info("Searching")

      const token = localStorage.getItem('token');

      // console.log(token)
      

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`, 
      {
        params: { searchTerm },
        headers: {
            Authorization: `${token}`,
        },
    }
);

      // update the parent component state with the search results
      setSearchResults(response.data);

      // pass the search results to the parent component
      onSearchResults(response.data);

    } catch (error) {
      // console.error('Error searching books:', error);
      toast.error("Error searching books")
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2>Have a book in mind?</h2>
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Search here :)'
        />
        <button 
          onClick={handleSearch}
          className='search-button '> 
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      <ToastContainer 
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="light"
      />
    </div>
  );
};

export default BookSearch;