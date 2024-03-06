import React, { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import "../styles/hamburger.css"
import { Link } from 'react-router-dom';

// https://hamburger-react.netlify.app/

const Samburger = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <div className="Hamburger">
            <Hamburger 
                size={20}
                duration={0.7}
                colour="#ffffff"
                toggled={isOpen}
                toggle={setOpen}
            />
            {isOpen && (
            <div className="Menu">
                <Link to="/register" className="menu-items">Register</Link>
                <Link to="/" className="menu-items">Login </Link>
                <Link to="/search" className="menu-items">Search </Link>
                <Link to="/my-collection" className="menu-items">My collection </Link>
                <Link to="/placeholder" className="menu-items">My Progress</Link>
            </div>
            )}
        </div>

    );
};

export default Samburger