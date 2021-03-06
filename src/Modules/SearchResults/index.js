import React from 'react';
import PropTypes from 'prop-types';
import { HashLoader } from 'react-spinners';
import Book from '../../Elements/Book';
import { spinner } from './data.json';

const SearchResults = (props) => {
    const { books, onMoveBook, isLoading } = props;

    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    isLoading ?
                        <HashLoader
                            color={spinner.color}
                            size={spinner.size}
                            loading={isLoading}
                        /> :
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
    isLoading: false,
};

SearchResults.propTypes = {
    books: PropTypes.arrayOf(Book),
    onMoveBook: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default SearchResults;
