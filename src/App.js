import React from 'react';
import SearchPage from './pages/SearchPage';
import RegisterPage from "./pages/RegisterPage"
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const App = () => {
  return (
    <div>
      {/* <SearchPage /> */}
      <Router>
        <Routes> 
          <Route path="/" Component={LoginPage} />
          <Route path="/search" Component={SearchPage} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;