import {
  faPaperPlane,
  faStickyNote,
} from "@fortawesome/free-regular-svg-icons";
import { faHandPaper } from "@fortawesome/free-regular-svg-icons/faHandPaper";
import {
  faNewspaper,
  faPencilSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { toast } from "react-toastify";

export default function MobileNav({ setToggle, toggle }) {
  const location = useLocation();
  const { user } = useAuthContext();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleLogout() {
    if (user) {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/login");
    }
  }


  return (
    <div
      onClick={() => setToggle(!toggle)}
      className="w-[90%] mt-4 flex flex-col items-start justify-around"
    >
      {user && (
        <NavLink
          to="/"
          className={
            location.pathname === "/"
              ? "text-sky-400  font-bold text-base text-center flex justify-center items-center"
              : "text-black font-bold text-base text-center flex justify-center items-center"
          }
        >
          <AiOutlineHome className="mr-[5px]" /> Home
        </NavLink>
      )}
      {user && (
        <NavLink
          to="/create/new"
          className={
            location.pathname === "/create/new"
              ? "text-sky-400  font-bold text-base text-center flex justify-center items-center"
              : "text-black font-bold text-base text-center flex justify-center items-center"
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
              : "text-black font-bold text-base text-center flex justify-center items-center"
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
              : "text-black font-bold text-base text-center flex justify-center items-center"
          }
        >
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPencilSquare} />
          To Do List
        </NavLink>
      )}
      <div className="w-[100%] mt-7 h-full ">
              {user && (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-2 px-5 rounded-xl font-mono font-bold text-lg"
                  type="button"
                >
                  Logout
                </button>
              )}
            </div>
    </div>
  );
}
