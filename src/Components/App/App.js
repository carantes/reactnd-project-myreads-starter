import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Library from '../Library/Library';
import Search from '../Search/Search';
import * as BooksAPI from '../../Api/BooksAPI'

import './App.css'

class App extends Component {

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

  render () {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Library books={books} />
        )}/>
        <Route path="/search" render={({ history }) => (
          <Search books={books} />
        )}/>
      </div>
    );
  }
}

export default App

