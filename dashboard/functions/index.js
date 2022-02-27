// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // create DB user on new AUTH user
// exports.addUser = functions.region('europe-west1').auth.user().onCreate(user => {
//   return admin.firestore().collection('users').doc(user.uid).create({
//     created: admin.firestore.FieldValue.serverTimestamp(),
//     email: user.email,
//     name: user.displayName,
//     organizations: [],
//   });
// });

// delete DB user on delete AUTH user - ok
exports.deleteUser = functions.region('europe-west1').auth.user().onDelete(user => {
  return admin.firestore().collection('users').doc(user.uid).delete();
});

// cleanup DB data after user deletion - ok
exports.cleanupUserDeleted = functions.region('europe-west1').firestore.document('users/{userID}').onDelete((snap, context) => {
  const uid = context.params.userID;
  const user = snap.data();
  user.organizations.forEach(org_number => {
    admin.firestore().collection('organizations').doc(org_number).collection('user_role').doc(uid).delete();
  });
  return {
    context: 'user deleted',
    user: user.name,
    email: user.email,
  };
});

// update user organizations on creating new organization - ok
exports.updateUserOrganizations = functions.region('europe-west1').firestore.document('organizations/{orgID}').onCreate((snap, context) => {
  const data = snap.data();
  const docRef = admin.firestore().collection('users').doc(data.created.user);
  return docRef.get().then((doc) => {
    let list = [];
    if (Array.isArray(doc.data()?.organizations)) {
      list = [...doc.data()?.organizations, data.org_number];
    } else {
      list = [data.org_number];
    }
    docRef.update({
      organizations: list
    });
  });
});

// update user organizations on user_role update
// ...

// update user organizations on organization delete
// ...

