import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu'

const Book = (props) => {

  const {
    shelf,
    id,
    title,
    imageLinks,
    authors,
    onMoveBook,
    draggable
  } = props

  const menuRender = (bookId) => (
    <Menu bookId={bookId} onChangeMenu={onMoveBook} active={shelf} />
  )

  const coverStyle = { width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` };

  const dragBookStart = (event) => {
    document.getElementById(id).classList.add("book-cover-selected");
    event.dataTransfer.setData("currentShelf", shelf);
    event.dataTransfer.setData("bookId", event.target.id);
  }

  const dragBookEnd = () => {
    document.getElementById(id).classList.remove("book-cover-selected");
  }

  return (
    <div className={draggable ? "book book-cursor" : "book"} >
      <div className="book-top" >
        <div className="book-cover" id={id} style={coverStyle} draggable={draggable} onDragStart={dragBookStart} onDragEnd={dragBookEnd}  ></div>
        { menuRender(id) }
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