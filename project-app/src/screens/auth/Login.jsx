import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { useLogin } from "../../api/users/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [togglePassword, setTogglePassword] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { login } = useLogin();

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();

    login(email, password);
    // setName("")
    setEmail("");
    setPassword("");
  }

  return (
    <div data-aos="fade-up" data-aos-duration="2000" className="w-full mt-5">
      <div className="w-full flex flex-col items-center bg-slate-300  py-5 ">
        <h2 className="text-sky-600 text-center w-full text-2xl font-black ">
          {" "}
          Login{" "}
        </h2>
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-[90%] md:w-[450px] lg:w-[550px] flex flex-col justify-center items-center"
          >
            {/* <input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="text"
              name="name"
              required
            /> */}
            <input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[80%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
              type="text"
              name="email"
              required
            />
            <div className=" w-[80%] flex flex-row justify-between items-center">
              <input
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[90%] bg-slate-50 my-2 outline-1 outline-blue-400 px-3 rounded-lg "
                type={togglePassword ? "password" : "text"}
                name="password"
                required
              />
              {!togglePassword ? (
                <FaEye onClick={() => setTogglePassword(!togglePassword)} />
              ) : (
                <FaEyeSlash
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              )}
            </div>
            <div className=" w-[80%]">
              <h3>
                If no account?
                <Link
                  to="/register"
                  className=" text-blue-700 
                  underline text-xl"
                >
                  Register
                </Link>
              </h3>
            </div>

            <button
              type="submit"
              className="w-[80%] bg-green-700 my-3 text-white font-bold text-xl rounded-xl py-1"
            >
              {" "}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
