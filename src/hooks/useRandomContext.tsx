import { RandomContext } from "../context/RandomContext";
import { useContext } from "react";

export const useRandomContext = () => {
  const context = useContext(RandomContext);

  if (!context) {
    throw Error(
      "useRandomContext must be used inside an RandomContextProvider"
    );
  }

  return context;
};
