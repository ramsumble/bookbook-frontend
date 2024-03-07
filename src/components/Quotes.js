import React, { useState } from 'react';
import quotes from '../utils/quotes';

const RandomQuoteComponent = () => {
    // eslint-disable-next-line 
    const [randomQuote, setRandomQuote] = useState(() => {
        const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return selectedQuote;
    });

    return (
        <div>
            <h2>{randomQuote.quote}</h2>
            <h3>- {randomQuote.author}</h3>
        </div>
    );
};

export default RandomQuoteComponent;