import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import BooksData from './Utils/BooksData';
import Library from './Pages/Library';
import Search from './Pages/Search';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: new BooksData(),
        };
    }

    updateState = (books, cb) => {
        this.setState({
            books,
        }, cb);
    }

    render() {
        const { books } = this.state;
        return (
            <BrowserRouter>
                <div className="app">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Library books={books} onUpdateSharedState={this.updateState} />
                        )}
                    />
                    <Route
                        path="/search"
                        render={() => (
                            <Search books={books} onUpdateSharedState={this.updateState} />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
