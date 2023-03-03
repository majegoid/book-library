/** Creates the Navbar. */
export function createNavbar() {}

// NAVBAR
const navCreateBookButton = document.querySelector('button.button-green');
const loginButton = document.querySelector('#login-button');
const logoutButton = document.querySelector('#logout-button');
const signupButton = document.querySelector('#signup-button');

// Add Click Handlers
// Pressing the "create book" button will toggle the modal display.
navCreateBookButton.onclick = toggleShowModalClickBg;

// Set up event handlers for signup, login, and logout buttons.
loginButton.onclick = () => {};
logoutButton.onclick = () => {};
signupButton.onclick = () => signUp(email, password);


