import { firebaseSetup } from './services/firebaseInit.js';

import { Book } from './dataStructures/Book.js';
import { Library } from './dataStructures/Library.js';
import { booksDisplayController } from './elementFactories/book/createBooksDisplayContainer.js';
import { bookFormController } from './elementFactories/forms/createCreateBookForm.js';
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

  function hideModal() {
    modalController.hideModal();
  }

  function showCreateBookForm() {
    const createBookForm = bookFormController.create();
    modalController.updateModalContents(createBookForm);
    bookFormController.setup();
  }

  function updateBooksDisplay() {
    booksDisplayController.update(library.getBooks());
  }

  return { hideModal, showCreateBookForm, updateBooksDisplay };
})();

(function main() {
  firebaseSetup();

  displayController.hideModal();
  displayController.showCreateBookForm();
  displayController.updateBooksDisplay();
})();
