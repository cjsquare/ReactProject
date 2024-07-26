import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../api";

const useUpdateWorkout = (id) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const updateWorkout = (data) => {
    setIsLoaded(true);

    // grab user info from local storage...
    // ,, assign to a variable    
    var user_id = JSON.parse(localStorage.getItem("user"));
    // reassign the user_id to user id gotten from local storage

    user_id = user_id?.id
    // deconstruct data 
    const {day, reps, author, createdAt, updatedAt} = data
    //  add user_id field to data object
    const dataItem = {
      day: day,
      reps: reps,
      author: author,
      user_id:user_id,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    // "http://localhost:3001/workout"
    // `{API_URL}/workout`
    //  run fetchAPI

    fetch(API_URL + "/workout/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataItem)
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
        toast.success('System has been updated')
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

  return { updateWorkout, isLoaded };
};

export { useUpdateWorkout };
