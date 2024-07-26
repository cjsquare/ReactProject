import React, { useEffect, useState } from "react";
import { useCreateWorkout } from "../api/useCreateWorkout";
import { set } from "date-fns";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { AiFillRest } from "react-icons/ai";

export default function WorkoutForm() {
  // This is a "useState" hook
  // states: To store values
  // useState: [state, state function]
  const [day, setDay] = useState("");
  const [reps, setReps] = useState("");
  const [author, setAuthor] = useState("");

  // This is a custom hook
  // Custom Hook for creating workout
  const { createWorkout } = useCreateWorkout(""); // we are deconstructing...
  // ..."create\Workout function", which is embedded and exported...
  // within and from (respectively), useCreateWorkout function.

  // This is a "useNavigate" hook
  // routing: used as a function to route pages
  const navigate = useNavigate();

  // This is a "ContextAPI" state
  // User: for getting "user" state from AuthContext
  const { user } = useAuthContext();
  //   const { createWorkout } = useCreateWorkout("");


  // This is a "useEffect" hook 
  // life cycle: used as a function to maintain...
  // ...sync with the system
  useEffect(() => { // This is used to ensure page 'authentication' routing...
    // ...ensuring user is authenticated AiFillRest, but accessing page

    // 1. To check if user data state exists
     if (!user) { // if no user
      navigate("/register"); // route back to Register page
      return; // stop execution
    }
  }, [user]); // [user]: This is a necessary dependency to prevent multiple rendering

  // A custom function (arrow function)
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent refresh/reload of page

    // initiate out 'createWorkout' function
    createWorkout(day, reps, author); //Function: sending out data (days, reps, author)...
    // ...as arguments

    // clear our fields after function had ran
    setDay("");
    setReps("");
    setAuthor("");
  };

  // render jsx(UI)
  return (
    <div data-aos="fade-up" data-aos-duration="2000" className="w-full mt-5">
      <div className="w-full flex flex-col items-center bg-slate-300  py-5 ">
        <h2 className="text-sky-600 text-center w-full text-2xl font-black ">
          {" "}
          Create Workout{" "}
        </h2>
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-[90%] md:w-[450px] lg:w-[550px] flex flex-col justify-center items-center"
          >
            <input
              placeholder="Enter day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="text"
              name="day"
            />
            <input
              placeholder="Enter reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="text"
              name="reps"
            />
            <input
              placeholder="Enter author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="text"
              name="author"
            />
            <button
              type="submit"
              className="w-[80%] bg-green-700 my-3 text-white font-bold text-xl rounded-xl py-1"
            >
              {" "}
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
