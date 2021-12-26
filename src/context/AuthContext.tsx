import React, { createContext, useReducer, useEffect, FC } from "react";
import { firebase, projectAuth } from "../firebase/config";

type Action = {
  type: string;
  payload: firebase.User | null;
};

type State = {
  user: firebase.User | null;
  authIsReady?: boolean;
};

// authIsReadyはdispatchでのみトグルしている
interface ContextInterface {
  dispatch: React.Dispatch<Action>; // dispatch: (value: Action) => void;
  user: firebase.User | null;
  authIsReady?: boolean;
}

const initState: State = {
  user: null,
  authIsReady: false,
};

export const AuthContext = createContext<ContextInterface | undefined>(
  undefined
);
// 初期値undefinedだがuseAuthContextで型ガードしている

export const authReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      if (!user) return;
      dispatch({
        type: "AUTH_IS_READY",
        payload: user,
      });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
