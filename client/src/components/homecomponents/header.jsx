import React from "react";
import Dropdownlist from "./menu/dropdownlist";
import hotel from "../assets/hotel.svg"

function header() {
  return (
    <>
      <header className="shadow-md rounded-md sticky top-2 z-20 flex flex-col ml-[21%] w-[55%]  px-5 py-8 my-2 bg-[#ffffff]">
        <span className="top-text flex items-center gap-1">Find hotel to stay <img className="w-6" src={hotel} alt="" srcset="" /></span>
        <div className="search mt-2 grid grid-cols-4 gap-2 ">
          <h2>Date</h2>
          <h2 className=" col-span-3">Hotel Type</h2>
          <div className="flex">
            <input
              type="date"
              className="border-black border-y-2 border-s-2"
              name=""
              id=""
            />
            <input
              type="date"
              className="border-black border-y-2 border-e-2"
              name=""
              id=""
            />
          </div>
          <Dropdownlist />
          <button className=" bg-blue-500 rounded-lg px-1 py-1 w-1/2">
            Search
          </button>
        </div>
      </header>
      <div className="t sticky z-10 top-0 w-[55%] ml-[21%] bg-[#FFF7FC] h-4"></div>
    </>
  );
}

export default header;
