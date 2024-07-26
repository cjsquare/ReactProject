import { type } from "@testing-library/user-event/dist/type";
import React, { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

// for workout timetable
export const authReducer = (state, action) => {
  // const updated = action.payload;

  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    
    default:
      return state;
  }
};

// const [ workout, setWorkout] = useState([])
// This is for state management 
// So in place of 'useState' hook, we used 'useReducer'

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        dispatch({type: "LOGIN", payload: user})
    } else {
        dispatch({type: "LOGOUT"});
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
