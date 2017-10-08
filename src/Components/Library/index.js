import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from '../Bookshelf'
import * as BooksAPI from '../../Api/BooksAPI'
import { title, shelfs } from './data.json';

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

  getAllBooks() {
    const { books } = this.state;
    return books["currentlyReading"].concat(books["wantToRead"], books["read"]);
  }

  getBookById (bookId) {
    const searchContext = this.getAllBooks();
    const book = searchContext.filter(book => book.id === bookId)[0];
    return book;
  }

  getBooksShelf(shelf) {
    return this.state.books[shelf];
  }

  moveBookFromTo = (bookId, to) => {  
    const book = this.getBookById(bookId);
    const { books } = this.state;
    
    //Remove book from shelf
    const from = book.shelf;
    books[from] = books[from].filter(book => book.id !== bookId); 
    
    //Add book to new Shelf
    book.shelf = to;   
    books[to].push(book);

    //update
    this.setState({
      books
    });
  }

  render() {
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map(shelf => (
              <Bookshelf key={shelf.id} id={shelf.id} title={shelf.title} books={this.getBooksShelf(shelf.id)} onMoveBook={this.moveBookFromTo} />
            ))}
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