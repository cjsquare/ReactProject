import { useContext } from "react";
import { AuthContext } from "../context-api/AuthContext";

// to check and ensure that we are within
// the component tree

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useUserContext must be used inside a WorkoutContextProvider"
    );
  }

  return context;
};
