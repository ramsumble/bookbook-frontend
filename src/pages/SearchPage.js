import BookSearch from "../components/Booksearch";
import Samburger from "../components/Hamburger";
import BookCard from "../components/Cards";
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
        <div className="boarder"></div>
        <div className="body">
          <div className="card-container">
            {searchResults.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
        </div>
      </div>
    </>
  );
};
  
export default SearchPage;