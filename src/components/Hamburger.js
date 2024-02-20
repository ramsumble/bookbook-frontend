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
                <Link to="/register">Go to Register Page</Link>
                <p className="menu-items">Menu Item 2</p>
                <p className="menu-items">Menu Item 3</p>
                <p className="menu-items">Menu Item 3</p>
            </div>
            )}
        </div>

    );
};

export default Samburger