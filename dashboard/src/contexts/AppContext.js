import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getAllRoles, getOrganizationList } from "../helpers/firestore";
import Loading from "../components/Loading";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

const useAppState = () => {
  return useContext(AppContext);
};

const initState = {
  currentOrganization: {},
  organizations: [],
  roles: [],
};

const _reduser = (state, action) => {
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
    case 'setRoles':
      return {
        ...state,
        roles: action.payload
      };
    default:
      return state;
  }
};

const _getRoles = async (dispatch) => {
  const roles = await getAllRoles();
  dispatch({
    type: 'setRoles',
    payload: roles
  });
};

const _getOrganizations = async (list, dispatch) => {
  const organizations = await getOrganizationList(list);
  dispatch({
    type: 'setOrganizations',
    payload: organizations
  });
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(_reduser, initState);

  // load state
  useEffect(async () => {
    await _getRoles(dispatch);
    await _getOrganizations(currentUser?.organizations || [], dispatch); // ! need to get live updates

    setLoading(false);
  }, []);

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
