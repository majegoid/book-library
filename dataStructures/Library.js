export class Library {
  /** In-memory array that holds the books for display. */
  library = [];

  constructor(startingBooks = []) {
    this.library = startingBooks;
    // bind instance methods' this keyword to the instance
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
    this.sortBooks = this.sortBooks.bind(this);
  }

  /** Adds a book to the library using the values from a bookData object. */
  addBook(book) {
    this.library.push(book);
    this.sortBooks();
  }

  /** Removes a book from the library by book reference. Updates the books display. */
  removeBook(book) {
    this.library = this.library.filter((b) => b !== book);
  }

  /** Sorts the books in the library. */
  sortBooks() {
    this.library = this.library.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;

      if (a.author > b.author) return 1;
      if (a.author < b.author) return -1;

      if (a.pages > b.pages) return 1;
      if (a.pages < b.pages) return -1;

      if (a.read > b.read) return 1;
      if (a.read < b.read) return -1;
    });
  }

  /** Gets the books in the library for display. */
  getBooks() {
    return [...this.library];
  }
}
