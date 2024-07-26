import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteWorkout } from "../../api/useDeleteWorkout";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function WorkoutCard({ workout }) {
  const navigate = useNavigate();

  const { deleteWorkout } = useDeleteWorkout();
  const handleDelete = (id) => {
    deleteWorkout(id);
    return;
  };

  return (
    <div className="w-full md:w-[800px] lg:w-[900px]">
      {/* // <div className="w-full md:w-3/5"> */}
      {/* '/update/' + data?.id */}
      {/* or */}
      {/* `/update/{data?.id}` */}
      {workout &&
        workout.map((data, index) => (
          <div
            key={data?.id}
            className="w-full py-3 my-3 px-2 bg-slate-100 flex flex-row justify-between"
          >
            <div
              onClick={() => navigate("/update/" + data?.id)}
              className="w-full cursor-pointer rounded-lg py-2 px-3"
            >
              {/* Day*/}
              <div className=" w-full h-[3rem] flex items-center">
                <h2 className="text-3xl font-mono font-bold">
                  {" "}
                  Day {data?.day}
                </h2>
              </div>

              {/* Rep */}
              <div className="w-full min-h-[4rem] h-auto">
                <h4 className="text-xl ">Reps: {data?.reps}</h4>
              </div>

              {/* border */}
              <div className="w-full flex justify-start">
                <div className=" w-10/12 border border-t-[1px]">
                  {/* Border line */}
                </div>
              </div>

              {/* Details */}
              <div className="w-full">
                <div className="w-full min-h-[2rem] h-auto flex flex-col md:flex-row justify-start md:justify-around items-center">
                  <div className="w-full md:w-2/3 flex flex-row justify-start ">
                    <span className="font-bold text-lg flex items-center">
                      Author:{" "}
                      <p className="pl-2 italic font-mono font-medium md:whitespace-break-spaces">
                        {" "}
                        {data?.author}
                      </p>
                    </span>
                  </div>
                  <div className="w-full md:w-1/3 flex flex-row justify-start  font-bold text-lg">
                    <span className="font-bold text-lg flex items-center md:whitespace-break-spaces md:break-words">
                      Date:
                      <p className="pl-2 italic font-mono font-medium md:whitespace-break-spaces md:break-all">
                        {" "}
                        {formatDistanceToNow(new Date(data.updatedAt), {
                          addSuffix: true,
                        })}
                        {/* {data?.updatedAt} */}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <FaTrashAlt
                onClick={() => handleDelete(data?.id)}
                className=" text-red-600 z-50"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
