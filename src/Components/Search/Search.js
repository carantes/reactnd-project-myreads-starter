import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './Results';
import * as BooksAPI from '../../Api/BooksAPI'

const WAIT_INTERVAL = 500;

class Search extends Component {

  constructor(props) {
    super();

    this.state = {
      loading: false,
      search: []
    };

    this.timer = null;
  }

  handleChange = (e) => {
    clearTimeout(this.timer);
    const param = e.target.value;
    this.timer = setTimeout(() => this.searchBooks(param), WAIT_INTERVAL);

  }

  getAllBooks() {
    const { books } = this.props;
    return books["currentlyReading"].concat(books["wantToRead"], books["read"]);
  }

  getBookById(bookId) {
    const searchContext = this.getAllBooks();
    const book = searchContext.filter(book => book.id === bookId)[0];
    return book;
  }

  searchBooks (param) {
    this.setState({ loading: true });

    BooksAPI.search(param, 20).then((results) => {
      let search;
      results.error ? search = [] : search = results

      const books = this.getAllBooks();

      search.map(item => {
        const found = this.getBookById(item.id);
        found ? item.shelf = found.shelf : item.shelf = '';
        return item;
      })
      
      this.setState({
        loading: false,
        search,
        books
      })
    })
  }

  addBookToShelf = (bookId, shelf) => {
    const { search } = this.state;

    const book = search.filter((book) => book.id === bookId)[0];
    book.shelf = shelf;

    const books = this.props.books;
    books[shelf].push(book);

    this.setState({
      books
    });
  }

  render() {

    const {
      loading,
      search
    } = this.state;

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
      { loading ? LoadingSearch : <SearchResults books={search} onMoveBook={this.addBookToShelf} /> }
    </div>
    )
  }
}

export default Search;