import Loading from "../components/Loading";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUser } from "../helpers/firestore";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
  signOut,
  deleteUser,
} from "firebase/auth";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const signup = async (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(result => {
      let user = result.user;
      createUser(user.uid, name, email);
    });
  };

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (window.innerWidth < 800) {
      return signInWithRedirect(auth, provider);
    }
    return signInWithPopup(auth, provider).then(result => {
      let user = result.user;
      createUser(user.uid, user.displayName, user.email);
    });
  };

  const signinWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    if (window.innerWidth < 800) {
      return signInWithRedirect(auth, provider);
    }
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

  const deleteCurrentUser = async () => {
    await deleteUser(auth.currentUser);
    navigate('/login');
  };

  const signout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  useEffect(() => {
    const run = async () => {
      const redirectUnsub = await getRedirectResult(auth).then(async result => {
        if (result) {
          let user = result.user;
          await createUser(user.uid, user.displayName, user.email);
        }
      });
      const authUnsub = onAuthStateChanged(auth, user => {
        if (!user) {
          signout();
        }
        setCurrentUser(user);
        setLoading(false);
      });
      return [authUnsub, redirectUnsub];
    };
    return run();
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