import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, query, where, Timestamp, onSnapshot, deleteDoc } from "firebase/firestore";

// COLLECTIONS

const usersRef = collection(db, 'users');
const organizationsRef = collection(db, 'organizations');
const participantsRef = collection(db, 'participants');
const rolesRef = collection(db, 'roles');

// SUB COLLECTIONS

const _getEventRef = (organizationID) => {
  return collection(db, `organizations/${organizationID}/events`);
};

const _getEventSignupRef = (organizationID, eventID) => {
  return collection(db, `organizations/${organizationID}/events/${eventID}/signup_list`);
};

const _getEventWaitingRef = (organizationID, eventID) => {
  return collection(db, `organizations/${organizationID}/events/${eventID}/waiting_list`);
};

const _getUserRoleRef = (organizationID) => {
  return collection(db, `organizations/${organizationID}/user_role`);
};

// HELPERS

const _getTimestamp = () => {
  return Timestamp.now();
};

const _getDoc = async (ref, docID) => {
  // const cache = await getDoc(doc(ref, docID), { caches });
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
    created: _getTimestamp(),
  };
};

const createUser = async (uid, name, email) => {
  if (await _getDoc(usersRef, uid)) {
    return false; // don't overwrite
  }
  const data = createUserObject(name, email);
  return await setDoc(doc(usersRef, uid), data);
};

// const updateUser = async (uid, name, email) => {
//   const data = createUserObject(name, email);
//   return await updateDoc(doc(usersRef, uid), data);
// };

// const getUser = async (uid) => {
//   return await _getDoc(usersRef, uid);
// };

const liveUser = async (uid, callbackFunction) => {
  const unsub = onSnapshot(doc(usersRef, uid), docs => {
    callbackFunction(docs);
  });
  return unsub;
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
  if (list.length !== 0) {
    const res = await getDocs(query(organizationsRef, where('org_number', 'in', list)));
    return _resultToObject(res);
  }
  return [];
};

const liveOrganizations = async (list, callbackFunction) => {
  if (list.length !== 0) {
    const unsub = onSnapshot(query(organizationsRef, where('org_number', 'in', list)), docs => {
      callbackFunction(docs);
    });
    return unsub;
  }
};

const deleteOrganization = async (orgID) => {
  return await deleteDoc(doc(organizationsRef, orgID));
};

// ORGANIZATIONS/EVENTS

const createEventObject = (userID, name, description, city, zip, street, emailBody, send_ticket, openTimestamp, closeTimestamp, is_reminder, is_waiting_list, max_participants, form) => {
  return {
    name: name,
    description: description,
    signup_count: '???',
    waiting_count: '???',
    address: {
      city: city,
      zip: zip,
      street: street,
    },
    email: {
      body: emailBody,
      send_ticket: send_ticket
    },
    signups: {
      open: openTimestamp,
      close: closeTimestamp,
      is_reminder: is_reminder,
      is_waiting_list: is_waiting_list,
      max_participants: max_participants,
      form: form
    },
    created: {
      user: userID,
      timestamp: _getTimestamp()
    },
  };
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

const setOrganizationUserRole = async (orgID, userID, role) => {
  const data = {
    role: role.id,
    created: _getTimestamp(),
  };
  const userRoleRef = _getUserRoleRef(orgID);
  return await setDoc(doc(userRoleRef, userID), data);
};

// PARTICIPANTS

// ROLES

const getAllRoles = async () => {
  const res = await getDocs(query(rolesRef));
  return _resultToObject(res);
};

export {
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
  liveEvents,
  // organizations/user_role

  // particiapnts

  // roles
  getAllRoles
};
