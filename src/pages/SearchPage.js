import BookSearch from "../components/Booksearch";
import Samburger from "../components/Hamburger";
import BookCard from "../components/Cards";
import "../styles/SearchPage.css"
import RandomQuoteComponent from "../components/Quotes";
import { useState } from "react";

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 20;

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setCurrentPage(1); // Set to the first page when resuklts return
      };

  const totalPages = Math.ceil(searchResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        {searchResults.length === 0 ? (
          <h2 className="temp-Text">Search your favourite books below</h2>
        ) : (
          <>
            <div className="card-container">
              {searchResults.slice(startIndex, endIndex).map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            <div className="pagination-container">

              <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>

              <span>{`Page ${currentPage} of ${totalPages}`}</span>

              <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
  
export default SearchPage;