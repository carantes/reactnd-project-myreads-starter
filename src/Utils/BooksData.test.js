import BooksData from './BooksData';

const validBookArray = [
    {
        id: 1,
        title: 'A valid book',
        shelf: 'wantToRead',
    },
    {
        id: 2,
        title: 'Other valid book',
        shelf: 'read',
    },
    {
        id: 3,
        title: 'Another valid book',
        shelf: 'wantToRead',
    },
    {
        id: 4,
        title: 'Last valid book',
        shelf: 'read',
    },
];

it('is a instance of a BooksData class', () => {
    const booksData = new BooksData();
    expect(booksData).toBeDefined();
});

/*
it('constructor throw an error if receive a invalid object', () => {
  const booksData = new BooksData({});
  expect(booksData).toThrow("Failed to create BooksData object");
}) */

it('constructor will sanitize any invalid object', () => {
    const booksData = new BooksData([{
        id: 'a',
        name: 'A invalid book',
        shelf: 'foo',
    }]);
    expect(booksData.currentlyReading.length).toEqual(0);
    expect(booksData.wantToRead.length).toEqual(0);
    expect(booksData.read.length).toEqual(0);
});


it('have a correct number of books in each shelf', () => {
    const booksData = new BooksData(validBookArray);
    expect(booksData.currentlyReading.length).toEqual(0);
    expect(booksData.wantToRead.length).toEqual(2);
    expect(booksData.read.length).toEqual(2);
});

it('get all books return a single array', () => {
    const booksData = new BooksData(validBookArray);
    expect(Array.isArray(booksData.getAllBooks())).toEqual(true);
});

it('get all books return an array with two objects', () => {
    const booksData = new BooksData(validBookArray);
    expect(booksData.getAllBooks().length).toEqual(4);
});

it('get book by id return a single object', () => {
    const booksData = new BooksData(validBookArray);
    expect(booksData.getBookById(3)).toEqual({
        id: 3,
        title: 'Another valid book',
        shelf: 'wantToRead',
    });
});

it('add book to shelf return a new array with one more book', () => {
    const booksData = new BooksData();
    const validBook = {
        id: 1,
        title: 'A valid book',
        shelf: 'wantToRead',
    };

    expect(booksData.wantToRead.length).toEqual(0);
    booksData.addBookToShelf(validBook, 'wantToRead');
    expect(booksData.wantToRead.length).toEqual(1);
});

it('move book from wantToRead to currentlyReading return a new array with correct', () => {
    const booksData = new BooksData(validBookArray);
    expect(booksData.wantToRead.length).toEqual(2);
    expect(booksData.currentlyReading.length).toEqual(0);

    booksData.moveBookByIdToShelf(3, 'currentlyReading');

    expect(booksData.wantToRead.length).toEqual(1);
    expect(booksData.currentlyReading.length).toEqual(1);
});
