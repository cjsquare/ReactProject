import { useContext } from "react";
import { WorkoutContext } from "../context-api/WorkoutContext";

// to check and ensure that we are within the component tree
export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error(
      "useWorkoutContext must be used inside a WorkoutContextProvider"
    );
  }

  return context;
};

// export default useWorkoutsContext;
