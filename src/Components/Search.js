import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../Api/BooksAPI'

const WAIT_INTERVAL = 500;

class Search extends Component {

  state = {
    loading: false,
    books: []
  }

  constructor(props) {
    super();

    this.state = {
      books: [],
      newBooks: {
        "currentlyReading": [],
        "wantToRead": [],
        "read": []
      }
    };

    this.timer = null;
  }

  handleChange = (e) => {
    clearTimeout(this.timer);
    const param = e.target.value;
    this.timer = setTimeout(() => this.searchBooks(param), WAIT_INTERVAL);

  }

  searchBooks (param) {
    this.setState({ loading: true });
    BooksAPI.search(param, 20).then((results) => {
      let books;
      results.error ? books = [] : books = results
      
      this.setState({
        books,
        loading: false
      })
    })
  }

  addBookToShelf = (bookId, shelf) => {
    const {
      books,
      newBooks
    } = this.state;

    const book = books.filter((book) => book.id === bookId)[0];
    newBooks[shelf].push(book);

    this.setState({
      newBooks
    })
  }

  render() {

    const {
      loading,
      books
    } = this.state;

    const SearchResults = (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            books.map(book => (
              <li key={book.id} >
                <Book {...book} onMoveBook={this.addBookToShelf}  />
              </li>
          ))}
        </ol>
      </div>
    );

    const LoadingSearch = (
      <div className="search-books-results">
        Loading...
      </div>
    );

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input 
            type="text" 
            onChange={this.handleChange}
            placeholder="Search by title or author" 
          />
        </div>
      </div>
      { loading ? LoadingSearch : SearchResults }
    </div>
    )
  }
}

export default Search;