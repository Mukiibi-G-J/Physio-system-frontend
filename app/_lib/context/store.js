"use client";
import { createContext, useReducer } from "react";
export const Store = createContext();
import Cookies from "js-cookie";

const initialState = {
  userVerificationEmail: Cookies.get("userVerificationEmail")
    ? JSON.parse(Cookies.get("userVerificationEmail"))
    : null,
  authTokens: localStorage.getItem("authTokensPhysio")
    ? JSON.parse(localStorage.getItem("authTokensPhysio"))
    : null,
  USER_NAME: Cookies.get("USER_NAME")
    ? JSON.parse(Cookies.get("USER_NAME"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_VERIFICATION_EMAIL": {
      const userVerificationEmail = action.payload;
      Cookies.get("userVerificationEmail")
        ? Cookies.remove("userVerificationEmail")
        : null;
      Cookies.set(
        "userVerificationEmail",
        JSON.stringify(userVerificationEmail)
      );
      return { ...state, userVerificationEmail };
    }

    case "LOGIN": {
      const authTokens = action.payload;
      // Cookies.set("authTokensPhysio", JSON.stringify(authTokens));
      localStorage.setItem("authTokensPhysio", JSON.stringify(authTokens));
      return { ...state, authTokens };
    }
    case "USER_NAME": {
      const USER_NAME = action.payload;
      Cookies.set("USER_NAME", JSON.stringify(USER_NAME));
      return { ...state, USER_NAME };
    }
    case "LOGOUT": {
      localStorage.removeItem("authTokensPhysio");

      return {
        ...state,
        user: null,
        authTokens: null,
        USER_NAME: null,
      };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
