import { createFormCheckbox } from './controls/createFormCheckbox.js';
import { createFormInput } from './controls/createFormInput.js';

// FORM
// Create Book Form Document Queries
let createBookModalForm = undefined;
let bookTitleInput = undefined;
let bookAuthorInput = undefined;
let bookPagesInput = undefined;
let bookHasBeenReadCheckbox = undefined;
let createBookButton = undefined;
let createBookModalFormTextInputs = undefined;

/** Creates the Create Book form. */
function create() {
  // <div class="container">
  // <div class="header">
  //   <h2>Create a Book</h2>
  // </div>
  // <form id="create-book-modal-form" class="form" novalidate>
  //   <div class="form-control">
  //     <label for="book-title">Title</label>
  //     <input
  //       type="text"
  //       id="book-title"
  //       name="title"
  //       placeholder="Title"
  //     />
  //     <i class="fas fa-check-circle"></i>
  //     <i class="fas fa-exclamation-circle"></i>
  //     <small>Error message</small>
  //   </div>
  //   <div class="form-control">
  //     <label for="book-author">Author</label>
  //     <input
  //       type="text"
  //       id="book-author"
  //       name="author"
  //       placeholder="Author"
  //     />
  //     <i class="fas fa-check-circle"></i>
  //     <i class="fas fa-exclamation-circle"></i>
  //     <small>Error message</small>
  //   </div>
  //   <div class="form-control">
  //     <label for="book-pages">Pages</label>
  //     <input
  //       type="text"
  //       id="book-pages"
  //       name="pages"
  //       placeholder="Pages"
  //     />
  //     <i class="fas fa-check-circle"></i>
  //     <i class="fas fa-exclamation-circle"></i>
  //     <small>Error message</small>
  //   </div>
  //   <div class="form-control">
  //     <label class="label-container" for="book-read">
  //       Have you read it?
  //       <input type="checkbox" id="book-read" name="read" checked />
  //       <span class="checkmark"></span>
  //     </label>
  //   </div>
  //   <button id="create-book-button" class="button-green">
  //     Create Book
  //   </button>
  // </form>
  // </div>

  // container
  const containerDiv = document.createElement('div');
  containerDiv.className = 'container';

  // header div
  const headerDiv = document.createElement('div');
  headerDiv.className = 'header';
  const headerH2 = document.createElement('h2');
  headerH2.textContent = 'Create a Book';
  headerDiv.appendChild(headerH2);
  containerDiv.appendChild(headerDiv);

  // form
  const form = document.createElement('form');
  form.id = 'create-book-modal-form';
  form.className = 'form';
  form.novalidate = true;
  // title input
  const titleFormControl = createFormInput('book-title', 'Title', 'title');
  form.appendChild(titleFormControl);
  // author text input
  const authorFormControl = createFormInput('book-author', 'Author', 'author');
  form.appendChild(authorFormControl);
  // pages text input
  const pagesFormControl = createFormInput('book-pages', 'Pages', 'pages');
  form.appendChild(pagesFormControl);
  // book read checkbox
  const bookReadFormControl = createFormCheckbox(
    'book-read',
    'Have you read it?',
    'read',
    true
  );
  form.appendChild(bookReadFormControl);
  // submit button
  const submitButton = document.createElement('button');
  submitButton.id = 'create-book-button';
  submitButton.className = 'button-green';
  submitButton.textContent = 'Create Book';
  form.appendChild(submitButton);
  containerDiv.appendChild(form);

  return containerDiv;
}

/** Refreshes document queries and adds event listeners to the form. */
function setup() {
  refreshCreateBookFormDocumentQueries();
  addCreateBookFormEventListeners();
}

/** Updates each DOM element variable related to the Create Book Form. */
function refreshCreateBookFormDocumentQueries() {
  createBookModalForm = document.querySelector('form#create-book-modal-form');
  bookTitleInput = document.querySelector('input#book-title');
  bookAuthorInput = document.querySelector('input#book-author');
  bookPagesInput = document.querySelector('input#book-pages');
  bookHasBeenReadCheckbox = document.querySelector('input#book-read');
  createBookButton = document.querySelector('button#create-book-button');
  createBookModalFormTextInputs = Array.from(
    document.querySelectorAll('#create-book-modal-form input[type="text"]')
  );
}

function addCreateBookFormEventListeners() {
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
    toggleShowModalClickBg();
  });

  // Validate every input when any input is changed.
  createBookModalFormTextInputs.forEach((input) =>
    input.addEventListener('input', checkInputs)
  );
}

/** Resets the form's input field values. */
function reset() {
  // resets form fields to ''
  createBookModalForm.reset();
  // resets form field classes to default
  createBookModalFormTextInputs.forEach((inputElem) =>
    setFormControlDefault(inputElem)
  );
}

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

export const bookFormController = {
  create,
  setup,
  reset,
};
