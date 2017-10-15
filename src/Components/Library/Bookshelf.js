import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

const Bookshelf = (props) => {

  const {
    id,
    books,
    title,
    onMoveBook
  } = props;

  const shelf = books[id];

  const dropBook = (event) => {
    event.preventDefault();
    const toShelf = id;
    const currentShelf = event.dataTransfer.getData("currentShelf");
    const bookId = event.dataTransfer.getData("bookId");
    
    if (bookId && toShelf && (toShelf !== currentShelf))
      onMoveBook(bookId, toShelf);
  }

  const allowDropBook = (event) => {
    event.preventDefault();
  }

  return (
    <div className="bookshelf" onDrop={dropBook} onDragOver={allowDropBook} >
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            shelf.map(book => (
              <li key={book.id} >
                <Book draggable={true} {...book} onMoveBook={onMoveBook} />
              </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  id: PropTypes.string.isRequired,
  books: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired
}

export default Bookshelf;