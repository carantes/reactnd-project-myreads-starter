function BooksData (books) {

  this.currentlyReading = [];
  this.wantToRead = [];
  this.read = [];

  if (books) {
    if (Array.isArray(books))
      books.map(book => Array.isArray(this[book.shelf]) ? this[book.shelf].push(book) : book)
    else
      throw new Error("Failed to create BooksData object")
  }
}

BooksData.prototype.getAllBooks = function() {
  return Object.keys(this).reduce((all, key) => all.concat(this[key]), []);
}

BooksData.prototype.getBookById = function(bookId) {
  return this.getAllBooks().filter(book => book.id === bookId)[0];
}

BooksData.prototype.moveBookByIdToShelf = function(bookId, shelf) {
  if (shelf === '') {
    return this;
  }

  const book = this.getBookById(bookId);

  //remove from current shelf
  if (book.shelf !== '') {
    const from = book.shelf; 
    this[from] = this[from].filter(b => b.id !== book.id);
  }

  return this.addBookToShelf(book, shelf)
}

BooksData.prototype.addBookToShelf = function(book, shelf) {
  
  if (!book) {
    return new Error('Book not found');
  }
  
  if (shelf === '') {
    return new Error('Shelf is empty');
  }

  book.shelf = shelf;
  this[shelf].push(book);

  return this;
}

export default BooksData;