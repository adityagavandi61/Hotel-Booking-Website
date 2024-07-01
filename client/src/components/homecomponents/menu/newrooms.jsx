import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function newrooms() {
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
      const scrollAmount = direction === "left" ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="container py-1 pl-2 relative">
        <span className="flex justify-between items-center mx-2 mr-4">
          <h1 className="font-bold">New Rooms</h1>
          <div className="end flex items-center gap-1">
            <Link className=" text-sm pb-1 text-blue-400 hover:text-blue-300 hover:border-b-2 hover:border-blue-300">
              View All
            </Link>
            <button
              onClick={() => scroll("left")}
              className="rounded-full text-black text-center text-xs"
            >
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full text-black text-center text-xs"
            >
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </span>
        <div className="notex w-full">
          <div
            ref={scrollContainerRef}
            className="flex w-full  snap-center overflow-auto scroll-smooth relative hide-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {places.length > 0 &&
              places.map((room, index) => (
                <Link
                  className="m-2 bg-[#ffffff] w-[200px] flex-shrink-0 border shadow-md hover:shadow-lg transition-all rounded-xl"
                  key={index}
                  to={"/roompage/" + room._id}
                >
                  <div className="block relative p-3 rounded-lg">
                    <img
                      alt="ecommerce"
                      className="object-cover border rounded-lg w-[180px] h-[180px]"
                      src={"http://localhost:3000/uploads/" + room.addphoto[0]}
                    />
                  </div>
                  <div className="px-2 pb-2">
                    <h2 className="text-gray-900 title-font text-base font-medium">
                      {room.title}
                    </h2>
                    <span className=" font-medium flex items-center text-gray-400 text-sm">
                      {" "}
                      <span class="material-symbols-outlined">bed</span>
                      <h6>{room.bed}</h6>
                    </span>
                    <p className="">
                      <b>₹ {room.price}.00</b>
                      <small>/night</small>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default newrooms;
