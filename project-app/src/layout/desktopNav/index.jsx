import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import {
  faNewspaper,
  faPencilSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/hooks/useAuthContext";

export default function DesktopNav() {
  const location = useLocation();
  const { user } = useAuthContext();
  //   const { createWorkout } = useCreateWorkout("");

  const navigate = useNavigate();

  return (
    <div className="w-[90%] flex items-center justify-around">
      {user && (
        <NavLink
          to="/"
          className={
            location.pathname === "/"
              ? "text-sky-400  font-bold text-base text-center flex justify-center items-center"
              : "text-white font-bold text-base text-center flex justify-center items-center"
          }
        >
          <AiOutlineHome className="ml-[5px]" /> Home
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/create/new"
          className={
            location.pathname === "/create/new"
              ? "text-sky-400  font-bold text-base text-center flex justify-center items-center"
              : "text-white font-bold text-base text-center flex justify-center items-center"
          }
        >
          
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlus} />
          Add Workout
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/blog"
          className={
            location.pathname === "/blog"
              ? "text-sky-400  font-bold text-base text-center flex justify-center items-center"
              : "text-white font-bold text-base text-center flex justify-center items-center"
          }
        >
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faNewspaper} />
          Blog
        </NavLink>
      )}
      {user && (
        <NavLink
        to="/todo"
        className={
          location.pathname === "/todo"
            ? "text-sky-400  font-bold text-base text-center flex justify-center items-center"
            : "text-white font-bold text-base text-center flex justify-center items-center"
        }
      >
        <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPencilSquare} />
        To Do List
      </NavLink>
      )}
    </div>
  );
}
