export class Library {
  /** In-memory array that holds the books for display. */
  library = [];
  constructor(startingBooks = []) {
    this.library = startingBooks;
  }

  /** Adds a book to the library using the values from a bookData object. */
  addBook(bookData) {
    let newBook = new Book(...Object.values(bookData));
    this.library.push(newBook);
    this.library.sort((a, b) => a.title - b.title);
    updateBooksDisplay();
  }

  /** Removes a book from the library by book reference. Updates the books display. */
  removeBook(book) {
    this.library = library.filter((b) => b !== book);
    updateBooksDisplay();
  }

  /** Sorts the books in the library. */
  sortBooks() {
    this.library = library.sort((a, b) => {
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
