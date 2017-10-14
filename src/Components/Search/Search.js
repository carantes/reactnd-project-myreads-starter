import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchResults from './Results';
import Loading from '../Loading';
import api from '../../Utils/api'
import { wait_interval } from '../../Utils/constants'

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
    this.timer = setTimeout(() => this.searchBooks(param), wait_interval);

  }

  mapBooksCurrentShelf (results) {
    let search;
    results.error ? search = [] : search = results;

    search.map(item => {
      const found = this.props.books.getBookById(item.id);
      found ? item.shelf = found.shelf : item.shelf = '';
      return item;
    })

    return search
  }

  selectedBook (bookId) {
    return this.state.search.filter((book) => book.id === bookId)[0]
  }

  searchBooks (param) {
    this.setState({ loading: true });

    api.search(param, 20)
      .then((results) => this.mapBooksCurrentShelf(results))
      .then((search) => this.setState({ loading: false, search }))
  }

  moveBookAndUpdate = (bookId, shelf) => {  
    api.update(bookId, shelf)
      .then((result) => this.selectedBook(bookId))
      .then((book) => this.props.books.addBookToShelf(book, shelf))
      .then((books) => this.props.onUpdateSharedState(books))
  }

  render() {

    const {
      loading,
      search
    } = this.state;

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
      { loading ? <Loading /> : <SearchResults books={search} onMoveBook={this.moveBookAndUpdate} /> }
    </div>
    )
  }
}

export default Search;