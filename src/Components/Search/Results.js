import React from 'react'
import Book from '../Book';

const SearchResults = (props) => {
  const { books, onMoveBook } = props;

  return (
    <div className="search-books-results">
        <ol className="books-grid">
          {
            books.map(book => (
              <li key={book.id} >
                <Book draggable={false} {...book} onMoveBook={onMoveBook}  />
              </li>
          ))}
        </ol>
      </div>
  )
}

export default SearchResults