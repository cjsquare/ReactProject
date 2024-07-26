import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { toast } from "react-toastify";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);

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
    <>
      <div className="w-full">
        <div className=" w-full bg-slate-500 flex justify-center py-3 px-2 md:px-5">
          <div className="w-full flex-row h-full flex items-center justify-around ">
            {/* Logo */}
            <div className="w-1/2 md:w-[30%] h-full text-sky-500 text-3xl font-bold">
              <Link to="/">Logo</Link>
            </div>
            {/* Navigation */}
            <div className="w-1/2 md:w-[40%] h-full">
              {/* Mobile */}
              <nav className="flex w-full justify-center md:hidden ">
                {user && (
                  <div className="w-full flex justify-end pr-5">
                    <GiHamburgerMenu
                      onClick={() => setToggle(!toggle)}
                      className="text-white font-bold text-2xl"
                    />
                  </div>
                )}
                {toggle && user && (
                  <div className="w-full h-full flex justify-end bg-black bg-opacity-95 fixed z-30 top-0 left-0 ">
                    <div
                      data-aos="fade-left"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000"
                      className="w-[65%]  h-full z-40 bg-slate-50 "
                    >
                      <div className="w-full z-50 mt-4 pr-5 flex flex-col justify-center items-end">
                        <FaTimes
                          onClick={() => setToggle(!toggle)}
                          className="text-red-600 text-2xl font-bold"
                        />
                        <MobileNav setToggle={setToggle} toggle={toggle} />
                      </div>
                    </div>
                  </div>
                )}
              </nav>
              {/* tablet and desktop */}
              <nav className="hidden w-full md:flex justify-center ">
                <DesktopNav />
              </nav>
            </div>
            {/* Logout*/}
            <div className="hidden md:w-[30%] h-full md:flex flex-row justify-end">
              {user && (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-3 px-5 rounded-xl font-mono font-bold text-xl"
                  type="button"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
