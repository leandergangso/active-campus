import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, query, where, Timestamp } from "firebase/firestore";

// get multiple
// const q = query(collection(db, "cities"), where("capital", "==", true));
// const querySnapshot = await getDocs(q)

// get all, don't use 'where'
// const q = query(collection(db, "cities"));
// const querySnapshot = await getDocs(q)

// collections
const usersRef = collection(db, 'users')
const organizationsRef = collection(db, 'organizations')
const participantsRef = collection(db, 'participants')
const rolesRef = collection(db, 'roles')

const _getTimestamp = () => {
  return + new Date()
}

const _makeTimestamp = (day, month, year) => {
  return Timestamp.fromDate(new Date(`${month} ${day}, ${year}`))
}

const _getDoc = async (ref, docID) => {
  const docSnap = await getDoc(doc(ref, docID))
  if (docSnap.exists()) {
    return docSnap // .id, .data()
  }
  return false
}

// USERS

const createUserObject = (name, email) => {
  return {
    name: name,
    email: email,
    organizations: [],
    created: _getTimestamp(),
  }
}

const createUser = async (uid, name, email) => {
  if (await _getDoc(usersRef, uid)) {
    return false // don't overwrite
  }

  try {
    const data = createUserObject(name, email)
    await setDoc(doc(usersRef, uid), data)
    return true
  } 
  catch (error) {
    console.error(error)
    return false
  }
}

const updateUser = async (uid, user) => {
  try {
    await updateDoc(doc(usersRef, uid), user)
    return true
  } 
  catch (error) {
    console.error(error)
    return false
  }
}

const getUser = async (uid) => {
  try {
    return await _getDoc(usersRef, uid)
  }
  catch (error) {
    console.error(error)
    return null
  }
}

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
  }
}

const createOrganization = async (userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf) => {
  if (await _getDoc(organizationsRef, orgNumber)) {
    return false // don't overwrite
  }

  try {
    const data = createOrganizationObject(userID, name, shortName, orgNumber, contactEmail, contactName, contactTlf)
    await setDoc(doc(organizationsRef, orgNumber), data)
    return true
  }
  catch (error) {
    console.error(error)
    return false
  }
}

const updateOrganization = async (uid, organization) => {
  try {
    await updateDoc(doc(organizationsRef, uid), organization)
    return true
  } 
  catch (error) {
    console.error(error)
    return false
  }
}

const getOrganization = async (orgNumber) => {
  try {
    return await _getDoc(organizationsRef, orgNumber)
  }
  catch (error) {
    console.error(error)
    return null
  }
}

// PARTICIPANTS




// ROLES




const testing = async () => {
  const data = await getUser('n95GpqAUzheO1WJWfHmSsCmwslB2')
  console.log(data)
}

export {
  testing,

  createUserObject,
  createUser,
  updateUser,
  getUser,

  createOrganizationObject,
  createOrganization,
  updateOrganization,
  getOrganization,
}
