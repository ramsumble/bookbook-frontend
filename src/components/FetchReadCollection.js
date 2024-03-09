import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProgressPage.css'
import Samburger from './Hamburger';
import { PieChart, Pie, Tooltip, Legend, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const ReadingCollection = () => {
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [genreCounts, setGenreCounts] = useState({});

 // random data for placeholder graph
 const lineChartData = [
  { name: 'Jan', pagesRead: Math.floor(Math.random() * 1000), booksCompleted: Math.floor(Math.random() * 1000) },
  { name: 'Feb', pagesRead: Math.floor(Math.random() * 1000), booksCompleted: Math.floor(Math.random() * 1000) },
  { name: 'Mar', pagesRead: Math.floor(Math.random() * 1000), booksCompleted: Math.floor(Math.random() * 1000) },
  { name: 'Apr', pagesRead: Math.floor(Math.random() * 1000), booksCompleted: Math.floor(Math.random() * 1000) },
  { name: 'May', pagesRead: Math.floor(Math.random() * 1000), booksCompleted: Math.floor(Math.random() * 1000) },
  { name: 'Jun', pagesRead: Math.floor(Math.random() * 1000), booksCompleted: Math.floor(Math.random() * 1000) },
];

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

        // After fetching all collections, update the state
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

   const pieChartData = Object.entries(genreCounts).map(([genre, count]) => ({
    name: genre,
    value: count,
  }));
  const pieChartColours = ['#0088FE', '#00C49F', '#FF8042', '#AF19FF', '#FFD700'];


  // Get the count from each collection
  const readingCollectionCount = books.filter(book => book.collection === 'ReadingCollection').length;
  const bookCollectionCount = books.filter(book => book.collection === 'BookCollection').length;
  const favouritesCollectionCount = books.filter(book => book.collection === 'FavouritesCollection').length;

  return (
    <div className='body-content'>
      <div className="top-right">
        <Samburger className="hamburger-container" />
      </div>
      <div className='genre-container'>
        <div className='genre-content'>
          <h3>Genre Counts for Book Collection</h3>
          {Object.entries(genreCounts).map(([genre, count]) => (
            <li key={genre}>Total {genre} books: <strong>{count}</strong></li>
          ))}
        </div>

        <div className='pie-chart-container'>
          <PieChart className='pie-chart' width={400} height={200}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#000"
                    fontSize={15}
                    textAnchor={x > cx ? 'start' : 'end'}
                  >{`${(percent * 100).toFixed(1)}%`}</text>
                );
              }}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieChartColours[index % pieChartColours.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="line" iconSize={20} layout="vertical" align="right" verticalAlign="middle"/>
          </PieChart>
          </div>
        </div>
      
      <div className='content-container'>
        <div className='collection-content'>
          <h2>Reading Collection</h2>
          <li>Total Books in Reading Collection: <strong>{bookCount}</strong></li>
          <li>Books to read: <strong>{readingCollectionCount}</strong></li>
          <li>Total Books in the Collection: <strong>{bookCollectionCount}</strong></li>
          <li>Favourited Books : <strong>{favouritesCollectionCount}</strong></li>
        </div>
        <div className='bar-chart-container'>
          <BarChart width={400} height={300} data={[
            { name: 'Completed', count: bookCollectionCount },
            { name: 'Reading', count: readingCollectionCount },
            { name: 'Favourites', count: favouritesCollectionCount },
          ]}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='count' fill='#8884d8' />
          </BarChart>
        </div>
      </div>

      <div className='placeholder-container'>
        <div className='placeholder-content'>
          <h2>Coming Soon!</h2>
          <li>Books completed: <strong>{lineChartData[lineChartData.length - 1].booksCompleted}</strong></li>
          <li>Pages Read: <strong>{lineChartData[lineChartData.length - 1].pagesRead}</strong></li>
        </div>

        <div className='line-chart-container'>
        <LineChart 
        width={400} 
        height={300} 
        data={lineChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
          <Line type="monotone" dataKey="pagesRead" stroke="#8884d8" />
          <Line type="monotone" dataKey="booksCompleted" stroke="#82ca9d" />
        </LineChart>
        </div>
      </div>

    </div>
  );
};

export default ReadingCollection;