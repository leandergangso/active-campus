import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, query, where, Timestamp, onSnapshot, deleteDoc } from "firebase/firestore";

// upload a file to storage, returns download url
const _uploadFile = async (userID, file) => {
  const fileName = `${userID}/${file.name}`;
  const fileRef = ref(storage, fileName);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

// delete file from storage, returns true/error
const _deleteFile = (userID, name) => {
  const fileName = `${userID}/${name}`;
  const fileRef = ref(storage, fileName);
  deleteObject(fileRef).then(() => {
    return true;
  }).catch((e) => {
    return e;
  });
};

// COLLECTIONS

const usersRef = collection(db, 'users');
const organizationsRef = collection(db, 'organizations');
// const participantsRef = collection(db, 'participants');
const rolesRef = collection(db, 'roles');

// SUB COLLECTIONS

const _getEventRef = (organizationID) => {
  return collection(db, `organizations/${organizationID}/events`);
};

// const _getEventSignupRef = (organizationID, eventID) => {
//   return collection(db, `organizations/${organizationID}/events/${eventID}/signup_list`);
// };

// const _getEventWaitingRef = (organizationID, eventID) => {
//   return collection(db, `organizations/${organizationID}/events/${eventID}/waiting_list`);
// };

// const _getUserRoleRef = (organizationID) => {
//   return collection(db, `organizations/${organizationID}/user_role`);
// };

// HELPERS

const createTimestamp = (date) => {
  return Timestamp.fromDate(date);
};

const _getTimestamp = () => {
  return Timestamp.now();
};

const _getDoc = async (ref, docID) => {
  const docSnap = await getDoc(doc(ref, docID));
  if (docSnap.exists()) {
    return docSnap; // .id, .data()
  }
  return false;
};

const _resultToObject = (docs) => {
  const list = [];
  docs.forEach(doc => {
    list.push({ id: doc.id, ...doc.data() });
  });
  return list;
};

// USERS

const createUserObject = (name, email) => {
  return {
    name: name,
    email: email,
    organizations: [],
    events: [],
    created: _getTimestamp(),
  };
};

const createUser = async (uid, name, email) => {
  if (await _getDoc(usersRef, uid)) {
    return false; // don't overwrite
  }
  const data = createUserObject(name, email);
  return setDoc(doc(usersRef, uid), data);
};

// const updateUser = async (uid, name, email) => {
//   const data = createUserObject(name, email);
//   return await updateDoc(doc(usersRef, uid), data);
// };

// const getUser = async (uid) => {
//   return await _getDoc(usersRef, uid);
// };

const liveUser = async (uid, callbackFunction) => {
  return onSnapshot(doc(usersRef, uid), doc => {
    callbackFunction(doc);
  });
};

// ORGANIZATION

const createOrganizationObject = (userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf) => {
  return {
    name: name,
    org_number: orgNumber,
    short_name: shortName,
    contact: {
      email: contactEmail,
      name: contactName,
      tlf: contactTlf,
    },
    created: {
      user: userID,
      timestamp: _getTimestamp(),
    },
  };
};

const createOrganization = async (userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf) => {
  if (await _getDoc(organizationsRef, orgNumber)) {
    return false;
  }
  return await setOrganization(userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf);
};

const setOrganization = async (userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf) => {
  const data = createOrganizationObject(userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf);
  return await setDoc(doc(organizationsRef, orgNumber), data);
};

const getOrganizations = async (list) => {
  if (list && list.length !== 0) {
    const res = await getDocs(query(organizationsRef, where('org_number', 'in', list)));
    return _resultToObject(res);
  }
  return [];
};

const liveOrganizations = async (list, callbackFunction) => {
  if (list && list.length !== 0) {
    return onSnapshot(query(organizationsRef, where('org_number', 'in', list)), docs => {
      callbackFunction(docs);
    });
  }
};

const deleteOrganization = async (orgID) => {
  return await deleteDoc(doc(organizationsRef, orgID));
};

// ORGANIZATIONS/EVENTS

const createEventObject = (
  userID, name, imageURL, description, address, email_body,
  date_from, date_to, signup_open, signup_close,
  max_participants, is_waiting_list, is_ticket, forms
) => {
  return {
    name: name,
    image: imageURL,
    description: description,
    address: address,
    email_body: email_body,
    max_participants: max_participants,
    is_waiting_list: is_waiting_list,
    is_ticket: is_ticket,
    signup_count: 0,
    waiting_count: 0,
    forms: forms,
    date: {
      from: date_from, // timestamp
      to: date_to, // timestamp
    },
    signup: {
      open: signup_open, // timestamp
      close: signup_close, // timestamp
    },
    created: {
      user: userID,
      timestamp: _getTimestamp()
    },
  };
};

const createEvent = async (
  orgID, userID, name, imageFile, description, address,
  email_body, date_from, date_to, signup_open, signup_close,
  max_participants, is_waiting_list, is_ticket, forms
) => {
  const imageURL = await _uploadFile(userID, imageFile);
  const eventRef = _getEventRef(orgID);
  const data = createEventObject(
    userID, name, imageURL, description, address,
    email_body, date_from, date_to, signup_open, signup_close,
    max_participants, is_waiting_list, is_ticket, forms
  );
  return await addDoc(eventRef, data);
};

const getEvent = async (orgID, eventID) => {
  const eventRef = _getEventRef(orgID);
  return await getDoc(doc(eventRef, eventID));
};

const liveEvents = (organizationID, callbackFunction) => {
  if (organizationID) {
    const eventRef = _getEventRef(organizationID);
    const unsub = onSnapshot(query(eventRef), docs => {
      callbackFunction(docs);
    });
    return unsub;
  }
};

// ORGANIZATIONS/EVENTS/SIGNUP_LIST

// ORGANIZATIONS/EVENTS/WAITING_LIST

// ORGANIZATIONS/USER_ROLE

// const setOrganizationUserRole = async (orgID, userID, role) => {
//   const data = {
//     role: role.id,
//     created: _getTimestamp(),
//   };
//   const userRoleRef = _getUserRoleRef(orgID);
//   return await setDoc(doc(userRoleRef, userID), data);
// };

// PARTICIPANTS

// ROLES

const getAllRoles = async () => {
  const res = await getDocs(query(rolesRef));
  return _resultToObject(res);
};

export {
  // helpers
  createTimestamp,
  // users
  createUser,
  liveUser,
  // organizations
  createOrganization,
  setOrganization,
  getOrganizations,
  liveOrganizations,
  deleteOrganization,
  // organizations/events
  createEvent,
  getEvent,
  liveEvents,
  // organizations/user_role

  // particiapnts

  // roles
  getAllRoles
};
