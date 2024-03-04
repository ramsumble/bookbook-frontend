import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Card from 'react-bootstrap/Card';
import FavIcon from './FavouriteIcon';
import '../styles/card.css'

const BookCard = ({ book }) => (
        <>
        <Card className='card-container' style={{ width: '15rem', margin: '90px', }}>
        <Card.Img variant="top" src={book.image} alt={book.title} />
        <Card.Body className='card-body'>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <FavIcon />
        </Card.Body>
        </Card>
        </>
);

export default BookCard;