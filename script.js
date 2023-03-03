// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { initAuth } from './firebaseAuth.js';
import { initDb } from './firestoreDb.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCaLGWEybwzofDRd2X-XAWepA5yCCBCvGI',
  authDomain: 'book-library-e8bde.firebaseapp.com',
  projectId: 'book-library-e8bde',
  storageBucket: 'book-library-e8bde.appspot.com',
  messagingSenderId: '944697328018',
  appId: '1:944697328018:web:fcc5dcf43c9f47174b814b',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
initAuth();
initDb();

console.log('app');
console.log(app);

import { signUp } from './firebaseAuth.js';

// DOCUMENT QUERIES
// NAVBAR
const navCreateBookButton = document.querySelector('button.button-green');
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');
const signupButton = document.querySelector('#signup-button');
// MAIN
const booksDisplayContainer = document.querySelector('main');
// MODAL
const modalClickBg = document.querySelector('div.modal-click-bg');
const createBookModal = document.querySelector('.modal');
// FORM
const createBookModalForm = document.querySelector(
  'form#create-book-modal-form'
);
const bookTitleInput = document.querySelector('input#book-title');
const bookAuthorInput = document.querySelector('input#book-author');
const bookPagesInput = document.querySelector('input#book-pages');
const bookHasBeenReadCheckbox = document.querySelector('input#book-read');
const createBookButton = document.querySelector('button#create-book-button');
const createBookModalFormTextInputs = Array.from(
  document.querySelectorAll('#create-book-modal-form input[type="text"]')
);

// END DOCUMENT QUERIES

// DATA STRUCTURES
/** Describes a Book. */
class Book {
  constructor(
    title = 'Unknown Title',
    author = 'Unknown Author',
    pages = 1,
    read = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info = () =>
    `${this.title} by ${this.author}, ${this.pages} pages, ${
      read ? 'read' : 'not read yet'
    }`;
  toggleBookReadStatus = () => {
    this.read = !this.read;
    updateBooksDisplay();
  };
}
// END DATA STRUCTURES

// GLOBAL STATE
/** In-memory array that holds the books for display. */
let library = [
  new Book('Book Title 1'),
  new Book('Book Title 2'),
  new Book('Book Title 3'),
  new Book('Book Title 4'),
  new Book('Book Title 5'),
  new Book('Book Title 6'),
];
// END GLOBAL STATE

// SET UP DOM
modalClickBg.style.display = 'none';

// toggle the modal display on click of the modal background, then reset the form
modalClickBg.onclick = () => {
  toggleCreateBookModalDisplay();
  resetForm();
};
// pressing the "create book" button will toggle the modal display
navCreateBookButton.onclick = toggleCreateBookModalDisplay;
// clicks on the modal don't go beyond it
createBookModal.onclick = (e) => e.stopPropagation();

// If the form is invalid when submitted, do nothing. If the form is valid when
// submitted, add a book from the Create book form input data to the library.
createBookModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isFormInvalid = checkInputs();
  if (isFormInvalid) return;
  let bookData = Object.fromEntries(
    new FormData(createBookModalForm).entries()
  );
  bookData.read = !!bookData.read;
  addBookToLibrary(bookData);
  toggleCreateBookModalDisplay();
});

// Validate every input when any input is changed.
createBookModalFormTextInputs.forEach((input) =>
  input.addEventListener('input', checkInputs)
);

// set up event listeners for signup, login, and logout buttons
loginButton.onclick = () => {};
logoutButton.onclick = () => {};
signupButton.onclick = () => signUp(email, password);

// END SET UP DOM

// DOM MANIPULATION FUNCTIONS
/** Adds a book to the library using the values from a bookData object. */
function addBookToLibrary(bookData) {
  let newBook = new Book(...Object.values(bookData));
  library.push(newBook);
  library.sort((a, b) => a.title - b.title);
  updateBooksDisplay();
}

/** Removes a book from the library by book reference. Updates the books display. */
function removeBookFromLibrary(book) {
  library = library.filter((b) => b !== book);
  updateBooksDisplay();
}

/** Clears the booksDisplayContainer.
 * Sorts all Books in the library by title, then author, then pages,
 * then read status, then appends them to the booksDisplayContainer. */
function updateBooksDisplay() {
  booksDisplayContainer.replaceChildren();
  library
    .sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;

      if (a.author > b.author) return 1;
      if (a.author < b.author) return -1;

      if (a.pages > b.pages) return 1;
      if (a.pages < b.pages) return -1;

      if (a.read > b.read) return 1;
      if (a.read < b.read) return -1;
    })
    .map((book) => createCardElem(book))
    .forEach((card) => booksDisplayContainer.appendChild(card));
}

/** Creates a card that displays a single book's info. */
function createCardElem(book) {
  // <div class='card'>
  //   <h3>"Book Title"</h3>
  //   <p>by Book Author</p>
  //   <p>Page Count: 999</p>
  //   <p>Finished Reading: True</p>
  //   <button>Delete</button>
  // </div>;

  let cardElem = document.createElement('div');
  let titleElem = document.createElement('h3');
  let authorElem = document.createElement('p');
  let pagesElem = document.createElement('p');
  let readElem = document.createElement('p');
  let buttonContainer = document.createElement('div');
  let toggleReadStatusButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  cardElem.setAttribute('class', 'card');
  titleElem.textContent = `"${book.title}"`;
  authorElem.textContent = `by ${book.author}`;
  pagesElem.textContent = `Pages: ${book.pages}`;
  readElem.textContent = `Finished Reading: ${book.read}`;
  toggleReadStatusButton.textContent = 'Toggle Read';
  toggleReadStatusButton.classList.add('button-blue');
  toggleReadStatusButton.onclick = book.toggleBookReadStatus;
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('button-red');
  deleteButton.style.float = 'right';
  deleteButton.onclick = () => removeBookFromLibrary(book);

  cardElem.appendChild(titleElem);
  cardElem.appendChild(authorElem);
  cardElem.appendChild(pagesElem);
  cardElem.appendChild(readElem);
  cardElem.appendChild(buttonContainer);

  buttonContainer.appendChild(toggleReadStatusButton);
  buttonContainer.appendChild(deleteButton);

  return cardElem;
}

/** Toggles the display value of the modal between block and none. */
function toggleCreateBookModalDisplay() {
  if (modalClickBg.style.display === 'none') {
    modalClickBg.style.display = 'block';
  } else {
    modalClickBg.style.display = 'none';
  }
}

/** Resets the form's input field values. */
function resetForm() {
  // resets form fields to ''
  createBookModalForm.reset();
  // resets form field classes to default
  createBookModalFormTextInputs.forEach((inputElem) =>
    setFormControlDefault(inputElem)
  );
}
// END DOM MANIPULATION FUNCTIONS

// CLASS MANIPULATION FUNCTIONS
/** Sets a form-control div's validation state to the default. Clears the error message. */
function setFormControlDefault(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control';
  const small = formControl.querySelector('small');
  small.innerText = '';
}

/** Sets a form-control div's class to show the error state. Shows the error message text. */
function setFormControlError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

/** Sets a form-control div's class to show the success state. Clears the error message. */
function setFormControlSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const small = formControl.querySelector('small');
  small.innerText = '';
}
// END ELEMENT CLASS MANIPULATION FUNCTIONS

/** Validates all form inputs, setting FormControlSuccess or FormControlError state on each input according to the validation rules*/
function checkInputs() {
  let validationError = false;
  // Trim all values
  const bookTitleValue = bookTitleInput.value.trim();
  const bookAuthorValue = bookAuthorInput.value.trim();
  const bookPagesValue = bookPagesInput.value.trim();

  // Validate that the book title is not empty
  if (bookTitleValue === '') {
    setFormControlError(bookTitleInput, `Book Title can't be blank.`);
    validationError = true;
  } else {
    setFormControlSuccess(bookTitleInput);
  }

  // Validate that the book author is not empty
  if (bookAuthorValue === '') {
    setFormControlError(bookAuthorInput, `Book Author can't be blank.`);
    validationError = true;
  } else {
    setFormControlSuccess(bookAuthorInput);
  }

  // Validate that the book has a positive whole number of pages
  if (bookPagesValue === '') {
    setFormControlError(bookPagesInput, `Book Pages can't be blank.`);
    validationError = true;
  } else if (Number.isNaN(+bookPagesValue)) {
    setFormControlError(bookPagesInput, `Book Pages value must be a number.`);
    validationError = true;
  } else if (+bookPagesValue <= 0) {
    setFormControlError(
      bookPagesInput,
      `Book Pages must be a positive number.`
    );
    validationError = true;
  } else if (!Number.isInteger(+bookPagesValue)) {
    setFormControlError(bookPagesInput, `Book Pages must be a whole number.`);
  } else {
    setFormControlSuccess(bookPagesInput);
  }
  return validationError;
}

updateBooksDisplay();
