import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { app } from './script.js';

let db = undefined;

export function initDb() {
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);

  console.log('db');
  console.log(db);
}

// try {
//   const docRef = await addDoc(collection(db, 'users'), {
//     first: 'Ada',
//     last: 'Lovelace',
//     born: 1815,
//   });
//   console.log('Document written with ID: ', docRef.id);
// } catch (e) {
//   console.error('Error adding document: ', e);
// }
