import React, { useEffect, useState } from "react";
import WorkoutCard from "../components/home/WorkoutCard";
// import UpdateWorkoutForm from "../components/home/UpdateWorkoutForm";
import Contain from "../components/home/component/Contain";
import { toast } from "react-toastify";
import { useGetWorkout } from "../api/useGetWorkout";
import { useWorkoutContext } from "../context/hooks/useWorkoutContext";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

// Reps, days time and author
export default function Home() {
  // const [ workout, setWorkout] = useState()
  const { workout } = useWorkoutContext();
  // const [ isLoaded, setIsLoaded ] = useState(false)

  const { user } = useAuthContext();
  //   const { createWorkout } = useCreateWorkout("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
      return;
    } else if (user) {
      navigate("/");
      return;
    }
  }, [user]);

  const { getWorkout, isLoaded } = useGetWorkout();

  useEffect(() => {
    console.log(workout);
  }, [workout]);

  useEffect(() => {
    // setTimeout(() => {
    getWorkout();
    // }, 2000);
  }, []);

  return (
    <Contain>
      {/* Card */}
      {workout && <WorkoutCard workout={workout} />}
      {!isLoaded && (
        <div className="mt-4 font-bold text-lg ">No workout records</div>
      )}

      {/* Update form */}
      {/* <UpdateWorkoutForm /> */}
    </Contain>
  );
}
