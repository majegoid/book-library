

let createBookButton = undefined;
let loginButton = undefined;
let logoutButton = undefined;
let signupButton = undefined;

function setup(createBookButtonHandler) {
  updateDocumentQueries();
  addEventHandlers(createBookButtonHandler);
}

function updateDocumentQueries() {
  createBookButton = document.querySelector('button.button-green');
  loginButton = document.querySelector('#login-button');
  logoutButton = document.querySelector('#logout-button');
  signupButton = document.querySelector('#signup-button');
}

// Set up event handlers for create book, signup, login, and logout buttons.
function addEventHandlers(createBookButtonHandler) {
  // Add Click Handlers
  // Pressing the "create book" button will toggle the modal display.
  createBookButton.onclick = createBookButtonHandler;
  loginButton.onclick = () => {};
  logoutButton.onclick = () => {};
  signupButton.onclick = () => signUp(email, password);
}

export const navbarController = { setup };
