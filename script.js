// DOCUMENT QUERIES
const booksDisplayElem = document.querySelector('main');
const navCreateBookButton = document.querySelector('button.button-green');
const createBookButton = document.querySelector('button#create-book-button');
const createBookModal = document.querySelector('.modal');
const form = document.querySelector('form');
const bookTitleInput = document.querySelector('input#book-title');
const bookAuthorInput = document.querySelector('input#book-author');
const bookPagesInput = document.querySelector('input#book-pages');
const bookHasBeenReadCheckbox = document.querySelector('input#book-read');
// END DOCUMENT QUERIES

// DATA STRUCTURES
function Book(title = 'Unknown Title', author = 'Unknown Author', pages = 1, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () =>
    `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`;
}
// END DATA STRUCTURES

// GLOBAL STATE
let myLibrary = [new Book(), new Book(), new Book(), new Book(), new Book()];
let isCreateBookModalShowing = false;
// END GLOBAL STATE

// SET UP DOM
createBookModal.style.display = 'none';
navCreateBookButton.setAttribute('onclick', () => console.log('asdf'));
console.log(navCreateBookButton.onclick);

// Validate form again when submitted.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isFormInvalid = checkInputs();
  if (isFormInvalid) {
    return;
  }
  console.log(e);
});

// Validate every input when any input is changed.
[bookTitleInput, bookAuthorInput, bookPagesInput, bookHasBeenReadCheckbox].forEach((input) =>
  input.addEventListener('input', checkInputs)
);
// END SET UP DOM

// DOM MANIPULATION FUNCTIONS
function addBookToLibrary() {}

function displayBooks() {
  booksDisplayElem.replaceChildren();
  myLibrary.map((book) => booksDisplayElem.appendChild(createCardElem(book)));
}

function createCardElem(book) {
  // <div class='card'>
  //   <h3>"Book Title"</h3>
  //   <p>by Book Author</p>
  //   <p>Page Count: 999</p>
  //   <p>Finished Reading: True</p>
  // </div>;
  let cardElem = document.createElement('div');
  let titleElem = document.createElement('h3');
  let authorElem = document.createElement('p');
  let pagesElem = document.createElement('p');
  let readElem = document.createElement('p');
  cardElem.setAttribute('class', 'card');
  titleElem.textContent = `"${book.title}"`;
  authorElem.textContent = `by ${book.author}`;
  pagesElem.textContent = `Pages: ${book.pages}`;
  readElem.textContent = `Finished Reading: ${book.read}`;
  cardElem.appendChild(titleElem);
  cardElem.appendChild(authorElem);
  cardElem.appendChild(pagesElem);
  cardElem.appendChild(readElem);
  return cardElem;
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
  let validationError = false;
  // Trim all values, set them as const values so they can't be reassigned.
  const bookTitleValue = bookTitleInput.value.trim();
  const bookAuthorValue = bookAuthorInput.value.trim();
  const bookPagesValue = bookPagesInput.value.trim();

  // Validate Book Title
  if (bookTitleValue === '') {
    setErrorFor(bookTitleInput, `Book Title can't be blank.`);
    validationError = true;
  } else {
    setSuccessFor(bookTitleInput);
  }

  // Validate Book Author
  if (bookAuthorValue === '') {
    setErrorFor(bookAuthorInput, `Book Author can't be blank.`);
    validationError = true;
  } else {
    setSuccessFor(bookAuthorInput);
  }

  // Validate Book Pages
  if (bookPagesValue === '') {
    setErrorFor(bookPagesInput, `Book Pages can't be blank.`);
    validationError = true;
  } else if (Number.isNaN(+bookPagesValue)) {
    setErrorFor(bookPagesInput, `Book Pages value must be a number.`);
    validationError = true;
  } else if (+bookPagesValue <= 0) {
    setErrorFor(bookPagesInput, `Book Pages can't be less than or equal to 0.`);
    validationError = true;
  } else {
    setSuccessFor(bookPagesInput);
  }
  return validationError;
}

displayBooks();
