import React from 'react';
import { string, func, arrayOf, shape, bool } from 'prop-types';
import Menu from './Menu';

const Book = (props) => {
    const {
        shelf,
        id,
        title,
        imageLinks,
        authors,
        onMoveBook,
        draggable,
    } = props;

    const menuRender = bookId => (
        <Menu bookId={bookId} onChangeMenu={onMoveBook} active={shelf} />
    );

    const coverStyle = { width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` };

    const dragBookStart = (event) => {
        document.getElementById(id).classList.add('book-cover-selected');
        event.dataTransfer.setData('currentShelf', shelf);
        event.dataTransfer.setData('bookId', event.target.id);
    };

    const dragBookEnd = () => {
        document.getElementById(id).classList.remove('book-cover-selected');
    };

    return (
        <div className={draggable ? 'book book-cursor' : 'book'} >
            <div className="book-top" >
                <div className="book-cover" id={id} style={coverStyle} draggable={draggable} onDragStart={dragBookStart} onDragEnd={dragBookEnd} />
                { menuRender(id) }
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    );
};

Book.defaultProps = {
    authors: [],
    shelf: '',
    imageLinks: {
        smallThumbnail: '',
    },
    onMoveBook: null,
    draggable: false,
};

Book.propTypes = {
    id: string.isRequired,
    title: string.isRequired,
    shelf: string,
    imageLinks: shape({
        smallThumbnail: string,
    }),
    authors: arrayOf(string),
    onMoveBook: func,
    draggable: bool,
};

export default Book;
