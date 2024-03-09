import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProgressPage.css'
import Samburger from './Hamburger';

const ReadingCollection = () => {
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [genreCounts, setGenreCounts] = useState({});

  useEffect(() => {
    const fetchCollections = async () => {
      const collectionUrls = [
        { url: process.env.REACT_APP_USER_READLIST_URL, collectionName: 'ReadingCollection' },
        { url: process.env.REACT_APP_USER_COLLECTIONS_URL, collectionName: 'BookCollection' },
        { url: process.env.REACT_APP_USER_FAVOURITES_URL, collectionName: 'FavouritesCollection' },
      ];

      try {
        const token = localStorage.getItem('token');
        let totalCount = 0;
        const allBooks = [];

        for (const { url, collectionName } of collectionUrls) {
          const response = await axios.get(url, {
            headers: {
              Authorization: `${token}`,
            },
          });

          console.log(`Response for ${collectionName}:`, response.data);

          // Update the state with the data from the response
          const booksWithCollection = response.data.map(book => ({ ...book, collection: collectionName }));
          allBooks.push(...booksWithCollection);
          totalCount += response.data.length;
        }

        // After fetching all collections, update the state once
        setBooks(allBooks);
        setBookCount(totalCount);

        // Extract all unique genres from BookCollection
        const bookCollectionGenres = allBooks
          .filter(book => book.collection === 'BookCollection')
          .map(book => book.genre);

        // Calculate genre counts
        const genreCountMap = {};
        bookCollectionGenres.forEach(genre => {
          genreCountMap[genre] = (genreCountMap[genre] || 0) + 1;
        });

        setGenreCounts(genreCountMap);
      } catch (error) {
        console.error('Error fetching collections:', error.response?.data || error.message);
      }
    };

    fetchCollections();
  }, []);

  // Get the count from each collection
  const readingCollectionCount = books.filter(book => book.collection === 'ReadingCollection').length;
  const bookCollectionCount = books.filter(book => book.collection === 'BookCollection').length;
  const favouritesCollectionCount = books.filter(book => book.collection === 'FavouritesCollection').length;

  return (
    <div className='body-content'>
      {/* <div className="hamburger-container">
        <Samburger />
      </div> */}
      <h2>Reading Collection</h2>
      
      <p>Total Books in Reading Collection: {bookCount}</p>

      <p>Total Books in Reading Collection 1: {readingCollectionCount}</p>
      <p>Total Books in Book Collection 2: {bookCollectionCount}</p>
      <p>Total Books in Favourites Collection 3: {favouritesCollectionCount}</p>

      {/* Display genre counts for BookCollection */}
      <h3>Genre Counts for Book Collection</h3>
      {Object.entries(genreCounts).map(([genre, count]) => (
        <p key={genre}>Total {genre} books: {count}</p>
      ))}
    </div>
  );
};

export default ReadingCollection;