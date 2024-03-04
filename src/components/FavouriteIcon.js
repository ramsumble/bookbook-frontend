import React, { useState } from 'react';
import '../styles/FavIcon.scss'

const FavIcon = () => {
  const [isIconOn, setIsIconOn] = useState(false);

  const handleIconClick = () => {
    setIsIconOn((prevIsIconOn) => !prevIsIconOn);
  };

  return (
    <div className={`star ${isIconOn ? 'starOn' : 'starOff'}`} onClick={handleIconClick}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polygon points="12,3 6,21 21,9 3,9 18,21" />
      </svg>
    </div>
  );
};

export default FavIcon;