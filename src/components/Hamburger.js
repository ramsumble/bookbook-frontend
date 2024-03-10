import React, { useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import "../styles/hamburger.css"
import { Link } from 'react-router-dom';
import LogoutButton from "./LogoutButton";

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
                <Link to="/search" className="menu-items">Search </Link>
                <Link to="/my-collection" className="menu-items">My collection </Link>
                <Link to="/my-progress" className="menu-items">My Progress</Link>
                <LogoutButton />
            </div>
            )}
        </div>

    );
};

export default Samburger