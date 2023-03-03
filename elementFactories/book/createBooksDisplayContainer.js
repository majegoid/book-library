import { createBookDisplayCard } from './createBookDisplayCard.js';

const booksDisplayContainer = document.querySelector('main');

/** Creates BookDisplayCards from a Book[] and updates the
 * BooksDisplayContainer's children. */
export function update(books, removeBookHandler, toggleBookReadStatusHandler) {
  booksDisplayContainer.replaceChildren();
  books.forEach((book) => {
    booksDisplayContainer.appendChild(
      createBookDisplayCard(
        book,
        removeBookHandler,
        toggleBookReadStatusHandler
      )
    );
  });
}

export const booksDisplayController = { update };
