// DOCUMENT QUERIES
const booksDisplayElem = document.querySelector('main');
const createBookButton = document.querySelector('#create-book-button');
// FORM RELATED:
const form = document.querySelector('form');
const bookTitleInput = document.querySelector('input#book-title');
const bookAuthorInput = document.querySelector('input#book-author');
const bookPagesInput = document.querySelector('input#book-pages');
const bookHasBeenReadCheckbox = document.querySelector('input#book-read');
// END DOCUMENT QUERIES

// GLOBAL STATE
let myLibrary = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () =>
    `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`;
}
// END GLOBAL STATE

// DOM MANIPULATION FUNCTIONS
function addBookToLibrary() {}

function displayBooks() {
  booksDisplayElem.innerHTML = myLibrary.map((book) => {
    let cardElem = document.createElement('div').setAttribute('class', 'card');
    cardElem.addChild((document.createElement('h2').textContent = book.title));
    // cardElem.addChild(document.c)
  });
}
// END DOM MANIPULATION FUNCTIONS

// form submit event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
});

// add checkInputs() call as input listeners to every input
[bookTitleInput, bookAuthorInput, bookPagesInput, bookHasBeenReadCheckbox].forEach((input) =>
  input.addEventListener('input', checkInputs)
);

function checkInputs() {
  // trim all values, set them as const values so they can't be reassigned
  const bookTitleValue = bookTitleInput.value.trim();
  const bookAuthorValue = bookAuthorInput.value.trim();
  const bookPagesValue = bookPagesInput.value.trim();
  // const bookHasBeenReadValue = bookHasBeenReadCheckbox.checked;

  // validate book title
  if (bookTitleValue === '') {
    setErrorFor(bookTitleInput, `Book Title can't be blank.`);
  } else {
    setSuccessFor(bookTitleInput);
  }

  // validate book author
  if (bookAuthorValue === '') {
    setErrorFor(bookAuthorInput, `Book Author can't be blank.`);
  } else {
    setSuccessFor(bookAuthorInput);
  }

  // validate book pages
  if (bookPagesValue === '') {
    setErrorFor(bookPagesInput, `Book Pages can't be blank.`);
  } else if (Number.isNaN(+bookPagesValue)) {
    setErrorFor(bookPagesInput, `Book Pages value must be a number.`);
  } else if (+bookPagesValue <= 0) {
    setErrorFor(bookPagesInput, `Book Pages can't be less than or equal to 0.`);
  } else {
    setSuccessFor(bookPagesInput);
  }

  // checkbox is not validated
}

// sets a form-control div's error class and the error message text
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// sets a form-control div's success class
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
