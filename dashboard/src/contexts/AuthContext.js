import Loading from "../components/Loading";
import { createContext, useContext, useEffect, useState } from "react";
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

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const _onUserUpdate = (doc) => {
    if (!doc.exists()) return signOut();

    const user = {
      id: doc.id,
      ...doc.data(),
    };

    setCurrentUser(user);
    setLoading(false);
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
    deleteUser(auth.currentUser);
  };

  const signout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, user => {
      if (user) {
        liveUser(user.uid, _onUserUpdate);
        setIsAuthenticated(true);
      } else {
        setCurrentUser();
        setIsAuthenticated(false);
        setLoading(false);
      }
    });
    return authUnsub;
  }, []);

  const value = {
    isAuthenticated,
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