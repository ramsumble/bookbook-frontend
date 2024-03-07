import React from 'react';
import SearchPage from './pages/SearchPage';
import RegisterPage from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookCollection from './components/BookCollection';
import ReadingCollection from './components/FetchReadCollection';



const App = () => {
  return (
    <div>
      <Router>
        <Routes> 
          <Route path="/" Component={LoginPage} />
          <Route path="/search" Component={SearchPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/my-collection" Component={BookCollection} />
          <Route path="/my-progress" Component={ReadingCollection} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;