import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Library from '../Library/Library';
import Search from '../Search/Search';
import BooksData from '../../Utils/BooksData';
import './App.css'

class App extends Component {

  state = {
    books: new BooksData()
  }

  updateState = (books, cb) => {
    this.setState({
      books
    }, cb)
  }

  render () {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Library books={books} onUpdateSharedState={this.updateState} />
        )}/>
        <Route path="/search" render={({ history }) => (
          <Search books={books} onUpdateSharedState={this.updateState} />
        )}/>
      </div>
    );
  }
}

export default App

