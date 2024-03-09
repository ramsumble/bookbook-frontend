import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReadingCollection = () => {
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);

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
    <div>
      <h2>Reading Collection</h2>
      <p>Total Books in Reading Collection: {bookCount}</p>
      <ul>
        {/* {books.map((book) => (
          <li key={book._id}>
            <strong>Title:</strong> {book.title}, <strong>Author:</strong> {book.author}, <strong>Genre:</strong> {book.genre} <strong>Page Count:</strong> {book.pageCount}
          </li>
        ))} */}
      </ul>

      <p>Total Books in Reading Collection 1: {readingCollectionCount}</p>
      <p>Total Books in Book Collection 2: {bookCollectionCount}</p>
      <p>Total Books in Favourites Collection 3: {favouritesCollectionCount}</p>
    </div>
  );
};

export default ReadingCollection;