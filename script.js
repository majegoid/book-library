import { firebaseSetup } from './services/firebaseInit.js';

import { Book } from './dataStructures/Book.js';
import { Library } from './dataStructures/Library.js';
import { booksDisplayController } from './elementFactories/book/createBooksDisplayContainer.js';
import { bookFormController } from './elementFactories/forms/createCreateBookForm.js';
import { modalController } from './functions/modal.js';
import { navbarController } from './elementFactories/navbar/createNavbar.js';

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

  /** Creates a CreateBookForm, updates the modal contents, performs setup for
   * the bookFormController, then shows the modal.*/
  function showCreateBookForm() {
    const createBookForm = bookFormController.create();
    modalController.updateModalContents(createBookForm);
    bookFormController.setup();
    modalController.showModal();
  }

  function updateBooksDisplay() {
    booksDisplayController.update(library.getBooks());
  }

  return { setup, hideModal, showCreateBookForm, updateBooksDisplay };
})();

(function main() {
  firebaseSetup();

  displayController.setup();
})();
