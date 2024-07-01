import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function banner() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/newrooms").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollContainerRef;
    if (current) {
      const scrollAmount = direction === "left" ? -815 : 815;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="container py-1 pl-2 relative">
        <div className="notex w-full flex items-center">
          <button
            onClick={() => scroll("left")}
            className=" absolute left-0 z-10 rounded-full text-black text-center text-xs"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <div
            ref={scrollContainerRef}
            className="flex w-full  snap-center overflow-auto scroll-smooth relative hide-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {places.length > 0 &&
              places.map((room, index) => (
                <Link
                  className="m-2 bg-[#ffffff] w-[97%] flex-shrink-0 border shadow-md hover:shadow-lg transition-all rounded-xl"
                  key={index}
                  to={"/roompage/" + room._id}
                >
                  <div className="flex justify-center p-1 rounded-lg">
                    <img
                      alt="advertisement"
                      className="object-cover border rounded-lg w-full h-[180px]"
                      src={"http://localhost:3000/uploads/" + room.addphoto[0]}
                    />
                  </div>
                </Link>
              ))}
          </div>
          <div class="absolute z-10 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              {places.length > 0 &&
                places.map((room, index) => (
                  <Link key={index}
                    class="w-3 h-3 rounded-full bg-gray-400"
                  ></Link>
                ))}
            </div>
          <button
            onClick={() => scroll("right")}
            className=" absolute right-0 z-10 rounded-full text-black text-center text-xs"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default banner;
