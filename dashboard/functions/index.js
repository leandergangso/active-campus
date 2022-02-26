// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// create DB user on new AUTH user
exports.addUser = functions.auth.user().onCreate(uid, user => {
  const res = await admin.firestore().collection('users').doc(uid).create(user);
  console.log(res.id, res.data());
});

// delete DB user on delete AUTH user
exports.deleteUser = functions.auth.user().onDelete((user) => {
  const res = await admin.firestore().collection('users').doc(user.id).delete();
  console.log(res.id, res.data());
});
