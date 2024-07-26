import React, { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

// for workout timetable
export const workoutReducer = (state, action) => {
  // const updated = action.payload;

  switch (action.type) {
    case "SET_WORKOUT":
      return {
        workout: action.payload,
      };
    case "GET_SINGLE_WORKOUT":
      return {
        singleWorkout: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workout: [...state.workout, action.payload],
      };
    case "UPDATE_WORKOUT":
      return {
        workout: state.workout.map((data) =>
          data.id === action.payload.id ? action.payload : data
        ),
      };
    case "DELETE_WORKOUT":
      return {
        workout: state.workout.filter((data) => data.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// const [ workout, setWorkout] = useState([])
// This is for state management 
// So in place of 'useState' hook, we used 'useReducer'

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workout: [],
    singleWorkout: null
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
