import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getAllRoles, liveOrganizations, liveUser } from "helpers/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import Loading from "components/Loading";

const AppContext = createContext();

const useAppState = () => {
  return useContext(AppContext);
};

const initState = {
  user: {},
  selectOrganization: '',
  currentOrganization: {},
  organizations: [],
  events: [],
  roles: [],
  breadCrum: '',
};

const _reduser = (state, action) => {
  console.log('update app state:', action.type, action.payload); // ! for debuging
  console.log(state);
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
    case 'breadCrum':
      return {
        ...state,
        breadCrum: action.payload
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(_reduser, initState);

  const setState = (type, payload) => {
    dispatch({
      type: type,
      payload: payload
    });
  };

  const _liveUser = (doc) => {
    if (!doc.exists()) return;
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
    if (currentUser.uid) {
      const userUnsub = liveUser(currentUser.uid, _liveUser);
      return [userUnsub];
    }
  }, [currentUser]);

  useEffect(() => {
    const run = async () => {
      if (state.user?.id) {
        const orgUnsub = liveOrganizations(state.user.organizations, _liveOrganizations);
        await _loadData();
        setLoading(false);
        return [orgUnsub];
      }
    };
    return run();
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
