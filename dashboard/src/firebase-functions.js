import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const addMessage = httpsCallable(functions, 'addMessage');

addMessage({ text: messageText })
  .then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const data = result.data;
    const sanitizedMessage = data.text;
  })
  .catch((error) => {
    // Getting the Error details.
    const code = error.code;
    const message = error.message;
    const details = error.details;
    // ...
  });


// ! setup and test app check - only my app can access these functions
// https://firebase.google.com/docs/app-check