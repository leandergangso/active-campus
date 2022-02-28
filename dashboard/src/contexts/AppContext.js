import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getAllRoles, getOrganizationList, liveUser } from "../helpers/firestore";
import { useAuth } from "./AuthContext";
import Loading from "../components/Loading";

const AppContext = createContext();

const useAppState = () => {
  return useContext(AppContext);
};

const initState = {
  user: {},
  currentOrganization: {},
  organizations: [],
  roles: [],
};

const _reduser = (state, action) => {
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: action.payload
      };
    case 'currentOrganization':
      const org = state.organizations.find(org => org.name === action.payload);
      return {
        ...state,
        currentOrganization: org || {},
      };
    case 'organizations':
      return {
        ...state,
        organizations: action.payload,
      };
    case 'roles':
      return {
        ...state,
        roles: action.payload
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { currentUser, signout } = useAuth();
  const [state, dispatch] = useReducer(_reduser, initState);

  const setState = (type, payload) => {
    dispatch({
      type: type,
      payload, payload
    });
  };

  const _liveUser = (doc) => {
    if (!doc.exists()) return signout();
    const user = {
      id: doc.id,
      ...doc.data(),
    };
    setState('user', user);
  };

  const loadData = async () => {
    const roles = await getAllRoles();
    const organizations = await getOrganizationList(state.user.organizations);
    setState('roles', roles);
    setState('organizations', organizations);
    if (organizations.length > 0 && state.currentOrganization === {}) {
      setState('currentOrganization', organizations[0].name);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const userUnsub = liveUser(currentUser.uid, _liveUser);
      return [userUnsub];
    }
  }, [currentUser]);

  useEffect(async () => {
    if (state.user.id) {
      await loadData();
      setLoading(false);
    }
  }, [state.user]);

  const value = {
    state,
    setState,
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
