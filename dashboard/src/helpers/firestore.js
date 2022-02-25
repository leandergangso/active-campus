import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, query, where, Timestamp, onSnapshot } from "firebase/firestore";

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

const _getOrganizationUserRoleRef = (organizationID) => {
  return collection(db, `organizations/${organizationID}/user_role`);
};

// HELPERS

const _getTimestamp = () => {
  return + new Date();
};

const _makeTimestamp = (day, month, year) => {
  return Timestamp.fromDate(new Date(`${month} ${day}, ${year}`));
};

const _getDoc = async (ref, docID) => {
  // const cache = await getDoc(doc(ref, docID), { caches });
  const docSnap = await getDoc(doc(ref, docID));
  if (docSnap.exists()) {
    return docSnap; // .id, .data()
  }
  return false;
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

  try {
    const data = createUserObject(name, email);
    await setDoc(doc(usersRef, uid), data);
    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
};

const updateUser = async (uid, user) => {
  try {
    await updateDoc(doc(usersRef, uid), user);
    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
};

const getUser = async (uid) => {
  return await _getDoc(usersRef, uid);
};

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
    return false; // don't overwrite
  }

  try {
    const data = createOrganizationObject(userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf);
    await setDoc(doc(organizationsRef, orgNumber), data);
    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
};

const updateOrganization = async (uid, organization) => {
  try {
    await updateDoc(doc(organizationsRef, uid), organization);
    return true;
  }
  catch (error) {
    console.error(error);
    return false;
  }
};

const getOrganization = async (orgNumber) => {
  return await _getDoc(organizationsRef, orgNumber);
};

// ORGANIZATIONS/EVENTS

const _createEventObject = (userID, name, description, city, zip, street, emailBody, send_ticket, openTimestamp, closeTimestamp, is_reminder, is_waiting_list, max_participants, form) => {
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

const getEventsLive = (organizationID, callbackFunction) => {
  const eventRef = _getEventRef(organizationID);
  const unsub = onSnapshot(query(eventRef), docs => {
    callbackFunction(docs);
  });
  return unsub;
};

// ORGANIZATIONS/EVENTS/SIGNUP_LIST

// ORGANIZATIONS/EVENTS/WAITING_LIST

// ORGANIZATIONS/USER_ROLE

// PARTICIPANTS

// ROLES

const getAllRoles = async () => {
  return await getDocs(query(rolesRef));
};

// ! delete
const testing = async () => {
  try {
    const data = await getAllRoles();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export {
  // ! delete
  testing,
  // users
  createUserObject,
  createUser,
  updateUser,
  getUser,
  liveUser,
  // organizations
  createOrganizationObject,
  createOrganization,
  updateOrganization,
  getOrganization,
  // organizations/events
  getEventsLive,
  // organizations/user_role

  // particiapnts

  // roles
  getAllRoles,
};
