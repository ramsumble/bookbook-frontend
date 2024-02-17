import React, { useEffect, useState } from "react";
import BookSearch from "../components/Booksearch";
import Samburger from "../components/Hamburger";
import "../styles/SearchPage.css"

const SearchPage = () => {

    const [randomQuote, setRandomQuote] = useState({ quote: '', author: '' });

    useEffect(() => {
        const quotes = [
            {
              quote: "So many books, so little time.",
              author: "Frank Zappa"
            },
            {
              quote: "A room without books is like a body without a soul.",
              author: "Marcus Tullius Cicero"
            },
            {
              quote: "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.",
              author: "Jane Austen, Northanger Abbey"
            },
            {
              quote: "Good friends, good books, and a sleepy conscience: this is the ideal life.",
              author: "Mark Twain"
            },
            {
              quote: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
              author: "Haruki Murakami, Norwegian Wood"
            },
            {
              quote: "I have always imagined that Paradise will be a kind of library.",
              author: "Jorge Luis Borges"
            },
            {
              quote: "Never trust anyone who has not brought a book with them.",
              author: "Lemony Snicket, Horseradish: Bitter Truths You Can't Avoid"
            },
            {
              quote: "You can never get a cup of tea large enough or a book long enough to suit me.",
              author: "C.S. Lewis"
            },
            {
              quote: "If one cannot enjoy reading a book over and over again, there is no use in reading it at all.",
              author: "Oscar Wilde"
            },
            {
              quote: "There is no friend as loyal as a book.",
              author: "Ernest Hemingway"
            },
            {
              quote: "′Classic′ - a book which people praise and don't read.",
              author: "Mark Twain"
            },
            {
              quote: "Books are a uniquely portable magic.",
              author: "Stephen King, On Writing: A Memoir of the Craft"
            },
            {
              quote: "... a mind needs books as a sword needs a whetstone, if it is to keep its edge.",
              author: "George R.R. Martin, A Game of Thrones"
            },
            {
              quote: "If one cannot enjoy reading a book over and over again, there is no use in reading it at all.",
              author: "Oscar Wilde"
            }
          ];
    
        const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        setRandomQuote(selectedQuote);


    }, []);


    return(
        <div className="header">
            <div className="row1">
                <h2 className="Quote-heading"> "{randomQuote.quote}" </h2>
                <h3 className="Author-heading"> - {randomQuote.author} </h3>
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