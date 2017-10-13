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

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            shelf.map(book => (
              <li key={book.id} >
                <Book {...book} onMoveBook={onMoveBook} />
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