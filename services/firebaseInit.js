// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';
import { initFirebaseAuth } from './firebaseAuth.js';
import { initFirestoreDb } from './firestoreDb.js';

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
export let app = undefined;

/** Initializes the Firebase App instance. */
function initFirebaseApp() {
  app = initializeApp(firebaseConfig);

  console.log('app');
  console.log(app);
}

/** Firebase Setup */
export function firebaseSetup() {
  initFirebaseApp();
  initFirebaseAuth();
  initFirestoreDb();
}
