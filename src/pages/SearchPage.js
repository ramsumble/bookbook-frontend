import React from "react";
import BookSearch from "../components/Booksearch";
import Samburger from "../components/Hamburger";

const SearchPage = () => {
    return(
        <div className="header">
            <div className="row1">
                <h1>Something something </h1>
            </div>
            <div classname="row2">
                <BookSearch />
                <Samburger />
            </div>
        </div>

    )
}

export default SearchPage;