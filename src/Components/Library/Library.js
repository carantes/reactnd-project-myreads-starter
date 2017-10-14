import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import Loading from '../Loading';
import { title, shelfs, buttonTitle } from './data.json';
import api from '../../Utils/api'
import BooksData from '../../Utils/BooksData';

class Library extends Component {

  state = {
    loading: true
  }

  updateState (books, loading) {
    this.props.onUpdateSharedState(books, () => {
      this.setState({
        loading
      })
    })
  }

  componentDidMount() {
    api.getAll()
      .then((books) => new BooksData(books))
      .then((books) => this.updateState(books, false));
  }

  moveBookAndUpdate = (bookId, shelf) => {
    shelf ? api.update(bookId, shelf)
      .then((result) => this.props.books.moveBookByIdToShelf(bookId, shelf))
      .then((books) => this.updateState(books)) : console.log('Cannot move book to a empty shelf');
  }

  renderBookShelf = (id, title, books) => (
    <Bookshelf key={id} id={id} title={title} books={books} onMoveBook={this.moveBookAndUpdate} />
  )

  render() {

    const { books } = this.props;
    const { loading } = this.state;
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            { loading ? <Loading /> : shelfs.map(shelf => ( this.renderBookShelf(shelf.id, shelf.title, books) )) }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >{buttonTitle}</Link>
        </div>
      </div>
    );
  }
}

export default Library;