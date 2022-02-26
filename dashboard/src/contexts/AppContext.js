import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getOrganizationList } from "../helpers/firestore";
import Loading from "../components/Loading";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

const useAppState = () => {
  return useContext(AppContext);
};

const reduser = (state, action) => {
  switch (action.type) {
    case 'setCurrentOrganization':
      return {
        ...state,
        currentOrganization: action.payload,
      };
    case 'setOrganizations':
      return {
        ...state,
        organizations: action.payload,
      };
    default:
      return state;
  }
};

const initState = {
  currentOrganization: {
    id: '',
    name: '',
  },
  organizations: [],
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reduser, initState);

  // load state
  useEffect(() => {
    // console.log('user:', currentUser.organizations.length);
    // const organizations = getOrganizationList(currentUser.organizations);
    // organizations.forEach(doc => {
    //   console.log(doc.id, doc.data());
    // });

    setLoading(false);
  });

  const value = {
    state,
    dispatch,
  };

  if (loading) {
    return (
      <Loading message="Gjør klar applikasjon..." />
    );
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export {
  useAppState,
  AppProvider
};
