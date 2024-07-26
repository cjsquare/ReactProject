import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleWorkout } from "../../api/useGetSingleWorkout";
import { useUpdateWorkout } from "../../api/useUpdateWorkout";
import { useWorkoutContext } from "../../context/hooks/useWorkoutContext";
import { useAuthContext } from "../../context/hooks/useAuthContext";

export default function UpdateWorkoutForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { singleWorkout } = useWorkoutContext();

  const {user} = useAuthContext()
  // const [workout, setWorkout] = useState()
  useEffect(() => {
    if (!user){
      navigate('/register')
      return
    }
  })

  const [data, setData] = useState({
    day: "",
    reps: "",
    author: ""
    
    
  })

  useEffect(() => {
    if (singleWorkout) {
      setData({
        day: singleWorkout?.day,
        reps: singleWorkout?.reps,
        author: singleWorkout?.author,
        createdAt: singleWorkout?.createdAt,
        
      });
    }
  }, [singleWorkout]);

  const { getSingleWorkout, isLoaded } = useGetSingleWorkout(id)
  const { updateWorkout, isLoaded: load } = useUpdateWorkout(id)

  useEffect(() => {
    getSingleWorkout()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  function handleUpdate(e) {
    e.preventDefault()

    const updatedData = {
      ...data,
      updatedAt: new Date().toISOString(),
      // set updatedAt to current timestamp
    }

    updateWorkout(updatedData)
    navigate("/")
  }
  return (
    <>
      <div className="w-full md:w-2/5">
        <div>{/* Update Form */}
          <div data-aos="fade-up" data-aos-duration="2000" className="w-full mt-5">
            <div className="w-full flex flex-col items-center bg-slate-300  py-5 ">
              <h2 className="text-sky-600 text-center w-full text-2xl font-black "> Update Workout </h2>
              <div className="w-full flex justify-center">
                <form onSubmit={handleUpdate} className="w-[90%] md:w-[450px] lg:w-[550px] flex flex-col justify-center items-center">
                  <input placeholder="Enter Day" className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg " value={data?.day} onChange={handleInputChange} type="text" name="day" required />
                  <input placeholder="Enter Reps" className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg " value={data?.reps} onChange={handleInputChange} type="text" name="reps" required/>
                  <input placeholder="Enter Author" className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg " value={data?.author} onChange={handleInputChange} type="text" name="author" required/>
                  <button type="submit" className="w-[80%] bg-green-700 my-3 text-white font-bold text-xl rounded-xl py-1" > Update </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
