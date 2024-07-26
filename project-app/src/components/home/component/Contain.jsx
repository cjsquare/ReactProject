import React from "react";

export default function Contain({children}) {
  return (
    <div data-aos="fade-up" data-aos-duration="2000" className="w-full">
      <div className="w-full">
        <div className="w-full flex justify-center gap-2.5 md:flex-row mt-5 px-4">
          {children}
        </div>
        {/* <div className="w-full flex flex-col-reverse gap-2.5 md:flex-row mt-5 px-4">{children}</div> */}
      </div>
    </div>
  );
}
