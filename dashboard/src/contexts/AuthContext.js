import Loading from "../components/Loading";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUser, liveUser } from "../helpers/firestore";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
} from "firebase/auth";

const AuthContext = React.createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const _onUserUpdate = (doc) => {
    const user = {
      id: doc.id,
      ...doc.data(),
    };
    setCurrentUser(user);
  };

  const signup = async (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(result => {
      let user = result.user;
      createUser(user.uid, name, email);
    });
  };

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
      let user = result.user;
      createUser(user.uid, user.displayName, user.email);
    });
  };

  const signinWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
      let user = result.user;
      createUser(user.uid, user.displayName, user.email);
    });
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const sendPasswordLink = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const deleteCurrentUser = () => {
    return deleteUser(currentUser);
  };

  const signout = () => {
    signOut(auth).then(() => {
      setCurrentUser();
    });
  };

  useEffect(() => {
    let userUnsub = null;
    const authUnsub = onAuthStateChanged(auth, user => {
      if (user) {
        userUnsub = liveUser(user.uid, _onUserUpdate);
      }
      setCurrentUser(user);
      setLoading(false);
    });
    return [authUnsub, userUnsub];
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signinWithGoogle,
    signinWithFacebook,
    sendPasswordLink,
    deleteCurrentUser,
    signout,
  };

  if (loading) {
    return (
      <Loading message="Sjekker verifisering..." />
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  useAuth,
  AuthProvider,
};