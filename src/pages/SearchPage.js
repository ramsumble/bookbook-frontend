import BookSearch from "../components/Booksearch";
import Samburger from "../components/Hamburger";
import "../styles/SearchPage.css"
import RandomQuoteComponent from "../components/Quotes";

const SearchPage = () => {

    return(
        <div className="header">
            <div className="row1">
                <RandomQuoteComponent />
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