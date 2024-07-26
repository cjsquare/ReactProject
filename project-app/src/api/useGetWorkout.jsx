import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../api";
import { useWorkoutContext } from "../context/hooks/useWorkoutContext";

const useGetWorkout = () => {
  const { dispatch } = useWorkoutContext();
  const [isLoaded, setIsLoaded] = useState(false);

  const getWorkout = () => {
    setIsLoaded(true);

    // "http://localhost:3001/workout"
    // `{API_URL}/workout`

    fetch(`${API_URL}/workout`)
      .then((response) => {
        if (!response.ok) {
          setIsLoaded(false);
          toast.error(response.statusText || "Error with our response!");
          return Promise.reject(new Error(response.statusText));
          // console.log("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          setIsLoaded(false);
          toast.warn("No workout records found");
          return;
        }
        console.log(data);
        dispatch({ type: "SET_WORKOUT", payload: data });
        // setWorkout(data);
        setIsLoaded(true);
        // console.log(data); // Process the JSON data here
      })
      .catch((error) => {
        console.error("Fetch error: ", error); // Log the error to the console

        setIsLoaded(false);
        toast.error(error.error || "Something is wrong with our server");
        // console.error(
        //   "There has been a problem with your fetch operation:",
        //   error
        // );
      });
  };

  return { getWorkout, isLoaded };
};

export { useGetWorkout };
