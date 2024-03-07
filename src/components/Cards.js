import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Card from 'react-bootstrap/Card';
import FavIcon from './AddToFavourites';
import '../styles/card.css'
import CollectionIcon from './AddToCollection';

const BookCard = ({ book }) => (
        <>
        <Card className='card-container' style={{ width: '15rem', margin: '90px', }}>
        <Card.Img variant="top" src={book.image} alt={book.title} />
        <Card.Body className='card-body'>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <div className='icon-container'>
                <FavIcon bookData={book} />
                <CollectionIcon bookData={book}/>
            </div>
        </Card.Body>
        </Card>
        </>
);

export default BookCard;