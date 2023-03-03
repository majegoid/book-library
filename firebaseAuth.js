import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

import { app } from './script.js';

let auth = undefined;

export function initAuth() {
  auth = getAuth(app);

  console.log('auth');
  console.log(auth);
}

export function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
