import { createBookDisplayCard } from './createBookDisplayCard.js';

const booksDisplayContainer = document.querySelector('main');

/** Creates BookDisplayCards from a Book[] and updates the
 * BooksDisplayContainer's children. */
export function update(books, removeBookHandler) {
  booksDisplayContainer.replaceChildren();
  books.forEach((book) => {
    booksDisplayContainer.appendChild(createBookDisplayCard(book, removeBookHandler));
  });
}

export const booksDisplayController = { update };
