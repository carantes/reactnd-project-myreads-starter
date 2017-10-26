import React from 'react';
import {
    shallow,
    mount,
} from 'enzyme';
import Book from './index';

describe('Book component', () => {
    const defaultProps = {
        id: '',
        imageLinks: {},
        authors: [],
        title: '',
        shelf: '',
        onMoveBook: jest.fn(),
    };

    it('should render without crash', () => {
        expect(shallow(
            <Book
                {...defaultProps}
            />,
        )).toMatchSnapshot();
    });

    it('should render title and author', () => {
        const props = {
            ...defaultProps,
            title: 'New Book 2017',
            authors: ['Author1', 'Author2'],
        };

        const book = shallow(<Book {...props} />);

        expect(book.find('.book-title').text()).toEqual('New Book 2017');
        expect(book.find('.book-authors').text()).toEqual('Author1,Author2');
    });

    it('should render if authors list is empty', () => {
        const props = {
            ...defaultProps,
            authors: null,
        };

        const book = shallow(<Book {...props} />);

        expect(book.find('.book-authors').text()).toEqual('');
    });

    it('should be draggable when need it', () => {
        const props = {
            ...defaultProps,
            draggable: true,
        };

        const book = shallow(<Book {...props} />);

        expect(book.find('.book-cover').prop('draggable')).toEqual(true);
    });

    it('should pass selected shelf to Menu', () => {
        const props = {
            ...defaultProps,
            shelf: 'read',
        };

        const book = mount(<Book {...props} />);

        expect(book.find('Menu').instance().props.active).toEqual('read');
    });

    it('should call onMoveBook prop when select shelf on Menu', () => {
        const props = {
            ...defaultProps,
        };

        const book = mount(<Book {...props} />);

        book.find('Menu').instance().props.onChangeMenu();

        expect(props.onMoveBook).toHaveBeenCalled();
    });
});

