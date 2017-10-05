import React from 'react';
import Menu from './Menu/Menu';
import PropTypes from 'prop-types';

const Book = (props) => {

  const {
    id,
    title,
    imageLinks,
    authors,
    bookShelfId,
    onMoveBook
  } = props

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
        <Menu bookShelfId={bookShelfId} bookId={id} onChangeMenu={onMoveBook} />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageLinks: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  bookShelfId: PropTypes.string.isRequired,
  onMoveBook: PropTypes.func.isRequired
}

export default Book;