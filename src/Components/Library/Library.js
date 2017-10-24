import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import Loading from '../Loading';
import { title, subtitle, shelfs, buttonTitle } from './data.json';
import api from '../../Utils/api';
import BooksData from '../../Utils/BooksData';

class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };

        window.addEventListener('resize', this.getCurrentBreakPoint);
        this.getCurrentBreakPoint();
    }

    componentWillMount() {
        window.addEventListener('scroll', this.resizeHeaderOnScroll);
    }

    componentDidMount() {
        api.getAll()
            .then(books => new BooksData(books))
            .then(books => this.updateState(books, false));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.resizeHeaderOnScroll, { passive: true });
    }

    getCurrentBreakPoint = (e) => {
        const currentWidth = e ? e.target.innerWidth : window.innerWidth;
        this.isMobile = currentWidth <= 600;
    }

    resizeHeaderOnScroll = () => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop;
        const shrinkOn = 100;
        const header = document.getElementById('header');

        if ((distanceY > shrinkOn) && (!this.isMobile)) {
            header.classList.add('smaller');
        } else {
            header.classList.remove('smaller');
        }
    }


    updateState(books, loading) {
        this.props.onUpdateSharedState(books, () => {
            this.setState({
                loading,
            });
        });
    }

    moveBookAndUpdate = (bookId, shelf) => {
        shelf && api.update(bookId, shelf)
            .then(() => this.props.books.moveBookByIdToShelf(bookId, shelf))
            .then(books => this.updateState(books));
    }

    renderBookShelf = (id, shelfTitle, books) => (
        <Bookshelf
            key={id}
            id={id}
            title={shelfTitle}
            books={books}
            onMoveBook={this.moveBookAndUpdate}
        />
    )

    render() {
        const { books } = this.props;
        const { loading } = this.state;

        return (
            <div className="list-books">
                <header id="header">
                    <div className="list-books-title">
                        <h1>{title}</h1>
                        <h3>{subtitle}</h3>
                    </div>
                </header>
                <div className="list-books-content">
                    <div>
                        {
                            loading ?
                                <Loading /> :
                                shelfs.map(
                                    shelf => (
                                        this.renderBookShelf(shelf.id, shelf.title, books)
                                    ),
                                )
                        }
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search" >{buttonTitle}</Link>
                </div>
            </div>
        );
    }
}

Library.defaultProps = {
    books: {},
};

Library.propTypes = {
    books: propTypes.instanceOf(BooksData),
    onUpdateSharedState: propTypes.func.isRequired,
};

export default Library;
