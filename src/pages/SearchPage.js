import BookSearch from "../components/Booksearch";
import Samburger from "../components/Hamburger";
import "../styles/SearchPage.css"
import RandomQuoteComponent from "../components/Quotes";
import { useState } from "react";

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearchResults = (results) => {
      setSearchResults(results);
    };
  
    return (
      <>
        <div className="header">
          <div className="row1">
            <RandomQuoteComponent />
          </div>
          <div className="row2">
            <div className="Booksearch-container">
              <BookSearch onSearchResults={handleSearchResults} />
            </div>
            <div className="hamburger-container">
              <Samburger />
            </div>
          </div>
        </div>
        <div className="body">
          {/* Display the search results */}
          <ul>
            {searchResults.map((book) => (
              <li key={book._id}>{book.title}</li>
            ))}
          </ul>
        </div>
      </>
    );
  };
  
  export default SearchPage;