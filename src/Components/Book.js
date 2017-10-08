import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu'

const Book = (props) => {

  const {
    shelfId,
    id,
    title,
    imageLinks,
    authors,
    onMoveBook
  } = props

  const menuRender = (bookId) => (
    <Menu bookId={bookId} onChangeMenu={onMoveBook} active={shelfId} />
  )

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
        {menuRender(id)}
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
  authors: PropTypes.array
}

export default Book;