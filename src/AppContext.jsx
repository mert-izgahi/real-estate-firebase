import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isAuthenticated: localStorage.getItem("user") ? true : false,
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    default:
      return state;
  }
};
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginReducer = (user) => {
    dispatch({
      type: "LOADING",
    });

    dispatch({
      type: "LOGIN",
      payload: user,
    });
  };

  const logoutReducer = () => {
    dispatch({
      type: "LOADING",
    });

    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        loginReducer,
        logoutReducer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
