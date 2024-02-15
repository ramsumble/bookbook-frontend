import React, { useState } from "react";
import { Spin as Hamburger } from 'hamburger-react'

// https://hamburger-react.netlify.app/

const Samburger = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <div className="Hamburger">
            <Hamburger 
                size={20}
                colour="#ffffff"
                toggled={isOpen}
                toggle={setOpen}
            />
            {isOpen && (
            <div className="MenuItems">
                <p>Menu Item 1</p>
                <p>Menu Item 2</p>
                <p>Menu Item 3</p>
            </div>
            )};
        </div>

    );
};

export default Samburger