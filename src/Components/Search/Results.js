import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

const SearchResults = (props) => {
    const { books, onMoveBook } = props;

    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    books.map(book => (
                        <li key={book.id} >
                            <Book draggable={false} {...book} onMoveBook={onMoveBook} />
                        </li>
                    ))}
            </ol>
        </div>
    );
};

SearchResults.defaultProps = {
    books: [],
};

SearchResults.propTypes = {
    books: PropTypes.arrayOf(Book),
    onMoveBook: PropTypes.func.isRequired,
};

export default SearchResults;
