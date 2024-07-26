import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../api/users/useAuth";
import { toast } from "react-toastify";

// import { useCreateWorkout } from "../api/useCreateWorkout";
// import { set } from "date-fns";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useAuthContext();
  const { register } = useRegister();
  //   const { createWorkout } = useCreateWorkout("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warn("Incorrect password match");
      return
    }

    register(name, email, password)

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div data-aos="fade-up" data-aos-duration="2000" className="w-full mt-5">
      <div className="w-full flex flex-col items-center bg-slate-300  py-5 ">
        <h2 className="text-sky-600 text-center w-full text-2xl font-black ">
          {" "}
          Register{" "}
        </h2>
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-[90%] md:w-[450px] lg:w-[550px] flex flex-col justify-center items-center"
          >
            <input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="text"
              name="name"
              required
            />
            <input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="text"
              name="email"
              required
            />
            <input
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="password"
              name="password"
              required
            />
            <input
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="password"
              name="confirmPassword"
              required
            />
            <div className=" w-[80%]">
              <h3>
                If account?{" "}
                <Link
                  to="/login"
                  className=" text-blue-700 
                  underline text-xl"
                >
                  Login
                </Link>
              </h3>
            </div>

            <button
              type="submit"
              className="w-[80%] bg-green-700 my-3 text-white font-bold text-xl rounded-xl py-1"
            >
              {" "}
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
