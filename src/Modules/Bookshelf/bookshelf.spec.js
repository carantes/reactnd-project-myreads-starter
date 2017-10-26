import React from 'react';
import {
    shallow,
} from 'enzyme';
import Bookshelf from './index';


describe('Bookshelf', () => {
    const defaultProps = {
        id: 'wantToRead',
        title: 'shelf',
        books: {
            currentlyReading: [
            ],
            wantToRead: [
                { id: '1', title: 'Book1' },
                { id: '1', title: 'Book2' },
            ],
            read: [],
        },
        onMoveBook: jest.fn(),
    };

    it('should render without crash', () => {
        expect(shallow(
            <Bookshelf
                {...defaultProps}
            />,
        )).toMatchSnapshot();
    });

    it('should render title and book count', () => {
        const bookShelf = shallow(<Bookshelf {...defaultProps} />);
        expect(bookShelf.find('.bookshelf-title').text()).toEqual('shelf (2)');
    });

    it('should have some books in array', () => {
        const bookShelf = shallow(<Bookshelf {...defaultProps} />);
        expect(bookShelf.find('Book').length).toBe(2);
    });
});
