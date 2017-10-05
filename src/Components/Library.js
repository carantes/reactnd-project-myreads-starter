import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../Api/BooksAPI'

class Library extends Component {

  state = {
    books: {
      "currentlyReading": [],
      "wantToRead": [],
      "read": []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((newBooks) => {
      const { books } = this.state;
      newBooks.map(book => (books[book.shelf].push(book)))
      this.setState({ books })
    })
  }

  getBooks(shelf) {
    return this.state.books[shelf];
  }

  moveBookFromTo = (bookId, from, to) => {  
    const { books } = this.state;
    const book = books[from].filter(book => book.id === bookId)[0];
    book.shelf = to

    books[from] = books[from].filter(book => book.id !== bookId);    
    books[to].push(book);

    this.setState({
      books
    });
  }

  render() {
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf id='currentlyReading' title='Currently Reading' books={this.getBooks("currentlyReading")} onMoveBook={this.moveBookFromTo} />
            <Bookshelf id='wantToRead' title='Want to Read' books={this.getBooks("wantToRead")} onMoveBook={this.moveBookFromTo} />
            <Bookshelf id='read' title='Read' books={this.getBooks("read")} onMoveBook={this.moveBookFromTo} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Library;