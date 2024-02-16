import React from "react";
import BookSearch from "../components/Booksearch";
import Samburger from "../components/Hamburger";
import "../styles/App.css"

const SearchPage = () => {
    return(
        <div className="header">
            <div className="row1">
                <h1>Something something </h1>
            </div>
            <div className="row2">
                <div className="Booksearch-container" >
                    <BookSearch />
                </div>
                <div className="hamburger-container">
                    <Samburger />
                </div>
            </div>
        </div>
    )
}

export default SearchPage;