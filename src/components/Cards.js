import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import FavIcon from './AddToFavourites';
import '../styles/card.css'
import CollectionIcon from './AddToCollection';
import ReadIcon from './AddToReadCollection';

const BookCard = ({ book }) => {
    const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;
  
    return (
      <>
        <Card className='card-container' style={{ width: '15rem', margin: '90px' }}>
          <Card.Img variant="top" src={book.image} alt={book.title} />
          <Card.Body className='card-body'>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <div className='icon-container'>
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip('Add to favorites')}
              >
                <div className="icon-wrapper">
                  <FavIcon bookData={book} />
                </div>
              </OverlayTrigger>
  
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip('Add to collection')}
              >
                <div className="icon-wrapper">
                  <CollectionIcon bookData={book} />
                </div>
              </OverlayTrigger>
  
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip('Mark as read')}
              >
                <div className="icon-wrapper">
                  <ReadIcon bookData={book} />
                </div>
              </OverlayTrigger>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  };

export default BookCard;