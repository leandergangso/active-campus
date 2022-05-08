// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const REGION = 'europe-west1';

// // create DB user on new AUTH user
// exports.onUserCreate = functions.region('europe-west1').auth.user().onCreate(user => {
//   return admin.firestore().collection('users').doc(user.uid).create({
//     created: admin.firestore.FieldValue.serverTimestamp(),
//     email: user.email,
//     name: user.displayName,
//     organizations: [],
//   });
// });

// on signup add to user.events - ok
exports.onSignup = functions.region(REGION).firestore.document('organizations/{orgID}/events/{eventID}/signup_list/{userID}').onCreate((snap, context) => {
  const id = context.params.orgID + '/' + context.params.eventID;
  // increment event signup counter
  const eventRef = admin.firestore().collection('organizations').doc(context.params.orgID).collection('events').doc(context.params.eventID);
  eventRef.get().then((doc) => {
    curCount = doc.data().signup_count;
    eventRef.update({
      signup_count: curCount + 1
    });
  });
  // add event to user event list
  const userRef = admin.firestore().collection('users').doc(context.params.userID);
  return userRef.get().then((doc) => {
    let list = [];
    if (Array.isArray(doc.data().events)) {
      list = [...doc.data().events, id];
    } else {
      list = [id];
    }
    userRef.update({
      events: list
    });
  });
});

// on signoff remove id from user.events 
exports.onSignoff = functions.region(REGION).firestore.document('organizations/{orgID}/events/{eventID}/signup_list/{userID}').onDelete((snap, context) => {
  const id = context.params.orgID + '/' + context.params.eventID;
  const userRef = admin.firestore().collection('users').doc(context.params.userID);
  // decrement event signup counter
  const eventRef = admin.firestore().collection('organizations').doc(context.params.orgID).collection('events').doc(context.params.eventID);
  eventRef.get().then((doc) => {
    curCount = doc.data().signup_count;
    eventRef.update({
      signup_count: curCount - 1
    });
  });
  // remove event from user event list
  return userRef.get().then((doc) => {
    if (Array.isArray(doc.data().events)) {
      let list = doc.data().events;
      list = list.filter(item => {
        return item !== id;
      });
      userRef.update({
        events: list
      });
    }
  });
});

// delete user and participant on delete auth user - ok
exports.onAuthDelete = functions.region(REGION).auth.user().onDelete(user => {
  admin.firestore().collection('participants').doc(user.uid).delete();
  return admin.firestore().collection('users').doc(user.uid).delete();
});

// cleanup db data after user deletion - ok
exports.onUserDelete = functions.region(REGION).firestore.document('users/{userID}').onDelete((snap, context) => {
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

// update user organizations and set user_role on creating new organization - ok
exports.onOrganizationCreate = functions.region(REGION).firestore.document('organizations/{orgID}').onCreate((snap, context) => {
  const data = snap.data();

  admin.firestore().collection('organizations').doc(context.params.orgID).collection('user_role').doc(data.created.user).create({
    created: admin.firestore.FieldValue.serverTimestamp(),
    role: 0
  });

  const userRef = admin.firestore().collection('users').doc(data.created.user);
  return userRef.get().then((doc) => {
    let list = [];
    if (Array.isArray(doc.data().organizations)) {
      list = [...doc.data().organizations, data.org_number];
    } else {
      list = [data.org_number];
    }
    userRef.update({
      organizations: list
    });
  });
});

// update user organizations on organization delete - ok
exports.onOrganizationDelete = functions.region(REGION).firestore.document('organizations/{orgID}').onDelete((snap, context) => {
  const data = snap.data();
  const userRef = admin.firestore().collection('users').doc(data.created.user);
  return userRef.get().then((doc) => {
    if (Array.isArray(doc.data().organizations)) {
      const list = doc.data().organizations;
      const lists = list.filter(item => {
        return item !== context.params.orgID;
      });
      userRef.update({
        organizations: lists
      });
    }
  });
});;

// update user organizations on user_role delete - ok
exports.onUserRoleDelete = functions.region(REGION).firestore.document('organizations/{orgID}/user_role/{userID}').onDelete((snap, context) => {
  const userRef = admin.firestore().collection('users').doc(context.params.userID);
  return userRef.get().then((doc) => {
    if (Array.isArray(doc.data().organizations)) {
      const list = doc.data().organizations;
      const lists = list.filter(item => {
        return item !== context.params.orgID;
      });
      userRef.update({
        organizations: lists
      });
    }
  });
});;
