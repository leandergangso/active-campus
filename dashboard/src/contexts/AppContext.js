import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getAllRoles, getOrganizationList, liveOrganizations, liveUser } from "../helpers/firestore";
import { useAuth } from "./AuthContext";
import Loading from "../components/Loading";

const AppContext = createContext();

const useAppState = () => {
  return useContext(AppContext);
};

const initState = {
  user: {},
  selectOrganization: '',
  currentOrganization: {},
  organizations: [],
  roles: [],
};

const _reduser = (state, action) => {
  console.log('update app state:', action.type, action.payload); // ! debuging
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: action.payload
      };
    case 'currentOrganization':
      return {
        ...state,
        currentOrganization: action.payload,
      };
    case 'selectOrganization':
      return {
        ...state,
        selectOrganization: action.payload,
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

  const _liveOrganizations = (docs) => {
    const orgList = [];
    docs.forEach(doc => {
      orgList.push({ id: doc.id, ...doc.data() });
    });
    setState('organizations', orgList);
  };

  const _loadData = async () => {
    const roles = await getAllRoles();
    setState('roles', roles);
  };

  useEffect(() => {
    if (currentUser) {
      const userUnsub = liveUser(currentUser.uid, _liveUser);
      return [userUnsub];
    }
  }, [currentUser]);

  useEffect(async () => {
    if (state.user.id) {
      const orgUnsub = await liveOrganizations(state.user.organizations, _liveOrganizations);
      await _loadData();
      setLoading(false);
      return orgUnsub;
    }
  }, [state.user]);

  useEffect(() => {
    if (state.organizations.length !== 0) {
      if (state.selectOrganization) {
        const org = state.organizations.find(org => org.org_number === state.selectOrganization);
        setState('currentOrganization', org);
        setState('selectOrganization', '');
      } else {
        const org = state.organizations.find(org => org.org_number === state.currentOrganization?.org_number) || state.organizations[0];
        setState('currentOrganization', org);
      }
    }
  }, [state.organizations]);

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
