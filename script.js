import { firebaseSetup } from './services/firebaseInit.js';

import { Book } from './dataStructures/Book.js';
import { Library } from './dataStructures/Library.js';
import { booksDisplayController } from './elementFactories/book/createBooksDisplayContainer.js';
import { createBookFormController } from './elementFactories/forms/createCreateBookForm.js';
import { navbarController } from './elementFactories/navbar/createNavbar.js';
import { modalController } from './functions/modal.js';

const displayController = (function createDisplayController() {
  const library = new Library([
    new Book('Book Title 1'),
    new Book('Book Title 2'),
    new Book('Book Title 3'),
    new Book('Book Title 4'),
    new Book('Book Title 5'),
    new Book('Book Title 6'),
  ]);

  /** Does one-time setup for persistent elements on the page. */
  function setup() {
    // perform one-time setups
    navbarController.setup(displayController.showCreateBookForm);
    // displayController.showCreateBookForm();
    modalController.setup();
    // prepare the display
    displayController.updateBooksDisplay();
  }

  /** Hides the modal. */
  function hideModal() {
    modalController.hideModal();
  }

  /** Updates the Books Display and hides the Modal. */
  function updateBooksDisplayAndHideModal() {
    displayController.hideModal();
    displayController.updateBooksDisplay();
  }

  /** Remove book and update Books Display. */
  function removeBookAndUpdateBooksDisplay(book) {
    library.removeBook(book);
    displayController.updateBooksDisplay();
  }

  /** Creates a CreateBookForm, updates the modal contents, performs setup for
   * the createBookFormController, then shows the modal.*/
  function showCreateBookForm() {
    const createBookForm = createBookFormController.create();
    modalController.updateModalContents(createBookForm);
    // createBookFormController.setup((book) => library.addBook(book));
    createBookFormController.setup(
      library.addBook,
      displayController.updateBooksDisplayAndHideModal
    );
    modalController.showModal();
  }

  function updateBooksDisplay() {
    booksDisplayController.update(
      library.getBooks(),
      displayController.removeBookAndUpdateBooksDisplay
    );
  }

  return {
    setup,
    hideModal,
    showCreateBookForm,
    updateBooksDisplay,
    updateBooksDisplayAndHideModal,
    removeBookAndUpdateBooksDisplay,
  };
})();

(function main() {
  firebaseSetup();

  displayController.setup();
})();
