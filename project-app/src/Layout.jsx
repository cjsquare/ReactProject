import React from "react";
import NavBar from "./layout/NavBar";

export default function Layout({ children }) {
  return (
    <>
      <div className=" w-full flex justify-center">
        <div className="w-full md:w-[1200px] px-2">
          <NavBar />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
