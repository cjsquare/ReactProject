import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../api";
import { useWorkoutContext } from "../context/hooks/useWorkoutContext";
import { useNavigate } from "react-router-dom";

const useCreateWorkout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { dispatch } = useWorkoutContext();
  const navigate = useNavigate();

  const createWorkout = (day, reps, author) => {
    setIsLoaded(true);
    const time = new Date();
    const createdAt = time.toISOString();
    const updatedAt = time.toISOString();

    var user_id = JSON.parse(localStorage.getItem("user"));
    user_id = user_id?.id

    const data = {
      day: day,
      reps: reps,
      author: author,
      user_id : user_id,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    // "http://localhost:3001/workout"
    // `{API_URL}/workout`

    fetch(API_URL + "/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

        toast.success("Workout created successfully");
        dispatch({ type: "CREATE_WORKOUT", payload: data });
        navigate("/");

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

  return { createWorkout, isLoaded };
};

export { useCreateWorkout };
