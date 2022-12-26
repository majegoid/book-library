// DOCUMENT QUERIES
const booksDisplayElem = document.querySelector('main');
const createBookButton = document.querySelector('#create-book-button');
const form = document.querySelector('form');
const bookTitleInput = document.querySelector('input#book-title');
const bookAuthorInput = document.querySelector('input#book-author');
const bookPagesInput = document.querySelector('input#book-pages');
const bookHasBeenReadCheckbox = document.querySelector('input#book-read');
// END DOCUMENT QUERIES

// DATA STRUCTURES
function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () =>
    `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`;
}
// END DATA STRUCTURES

// GLOBAL STATE
let myLibrary = [];

let isCreateBookModalShowing = false;
// END GLOBAL STATE

// SET UP EVENT LISTENERS
// Validate form again when submitted.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

// Validate every input when any input is changed.
[bookTitleInput, bookAuthorInput, bookPagesInput, bookHasBeenReadCheckbox].forEach((input) =>
  input.addEventListener('input', checkInputs)
);
// END SET UP EVENT LISTENERS

// DOM MANIPULATION FUNCTIONS
function addBookToLibrary() {}

function displayBooks() {
  booksDisplayElem.innerHTML = myLibrary.map((book) => {
    let cardElem = document.createElement('div').setAttribute('class', 'card');
    cardElem.addChild((document.createElement('h2').textContent = book.title));
  });
}

function toggleCreateBookModalDisplay() {
  isCreateBookModalShowing = !isCreateBookModalShowing;
}
// END DOM MANIPULATION FUNCTIONS

// CLASS MANIPULATION FUNCTIONS
// Sets a form-control div's class to show the error state and the error message text.
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Sets a form-control div's class to show the success state.
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
// END ELEMENT CLASS MANIPULATION FUNCTIONS

function checkInputs() {
  // Trim all values, set them as const values so they can't be reassigned.
  const bookTitleValue = bookTitleInput.value.trim();
  const bookAuthorValue = bookAuthorInput.value.trim();
  const bookPagesValue = bookPagesInput.value.trim();

  // Validate Book Title
  if (bookTitleValue === '') {
    setErrorFor(bookTitleInput, `Book Title can't be blank.`);
  } else {
    setSuccessFor(bookTitleInput);
  }

  // Validate Book Author
  if (bookAuthorValue === '') {
    setErrorFor(bookAuthorInput, `Book Author can't be blank.`);
  } else {
    setSuccessFor(bookAuthorInput);
  }

  // Validate Book Pages
  if (bookPagesValue === '') {
    setErrorFor(bookPagesInput, `Book Pages can't be blank.`);
  } else if (Number.isNaN(+bookPagesValue)) {
    setErrorFor(bookPagesInput, `Book Pages value must be a number.`);
  } else if (+bookPagesValue <= 0) {
    setErrorFor(bookPagesInput, `Book Pages can't be less than or equal to 0.`);
  } else {
    setSuccessFor(bookPagesInput);
  }
}
