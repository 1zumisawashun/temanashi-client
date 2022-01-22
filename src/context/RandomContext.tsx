import React, { createContext, useReducer, FC } from "react";

type Action = {
  type: string;
  payload: number | null;
};

type State = {
  random: number | null;
};

// authIsReadyはdispatchでのみトグルしている
interface ContextInterface {
  dispatch: React.Dispatch<Action>; // dispatch: (value: Action) => void;
  random: number | null;
}

const initState: State = {
  random: null,
};

export const RandomContext = createContext<ContextInterface | undefined>(
  undefined
);
// 初期値undefinedだがuseAuthContextで型ガードしている

export const randomReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SAVE_COUNT":
      return { ...state, random: action.payload };
    default:
      return state;
  }
};

export const RandomContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(randomReducer, initState);

  return (
    <RandomContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RandomContext.Provider>
  );
};
