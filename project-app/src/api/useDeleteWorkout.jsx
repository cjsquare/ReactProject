import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../api";
import { useWorkoutContext } from "../context/hooks/useWorkoutContext";

const useDeleteWorkout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { dispatch } = useWorkoutContext();

  const deleteWorkout = (id) => {
    setIsLoaded(true);

    // "http://localhost:3001/workout"
    // `{API_URL}/workout`

    fetch(API_URL + "/workout/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        if (!response.ok) {
          setIsLoaded(false);
          toast.error(response.statusText || "Error with our response!");
          return;
          // console.log("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          setIsLoaded(false);
          return;
        }
        toast.success("Workout has been deleted");
        dispatch({ type: "DELETE_WORKOUT", payload: data });
        // setWorkout(data);
        setIsLoaded(true);
        // console.log(data); // Process the JSON data here
      })
      .catch((error) => {
        setIsLoaded(false);
        toast.error(error.error || "Something is wrong with our server");
        // console.error(
        //   "There has been a problem with your fetch operation:",
        //   error
        // );
      });
  };

  return { deleteWorkout, isLoaded };
};

export { useDeleteWorkout };
