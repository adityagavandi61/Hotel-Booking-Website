import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function mostpopular() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/mostpopular").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <>
      <div className="container py-1 pl-2 relative">
        <div className="notex w-full">
          <div className="grid grid-cols-2 w-full  snap-center overflow-auto scroll-smooth relative hide-scrollbar">
            {places.length > 0 &&
              places.map((room, index) => (
                <Link
                  className="m-2 bg-[#ffffff] flex flex-row flex-wrap border shadow-md hover:shadow-lg transition-all rounded-xl"
                  key={index}
                  to={"/roompage/" + room._id}
                >
                  <div className="block relative p-3 rounded-lg">
                    <img
                      alt="ecommerce"
                      className="object-cover border rounded-lg w-[60px] h-[60px]"
                      src={"http://localhost:3000/uploads/" + room.addphoto[0]}
                    />
                  </div>
                  <div className="px-2 pb-2">
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {room.title}
                    </h2>
                    <span className=" font-medium text-gray-400 text-sm">
                      {" "}
                      {room.bed}
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

export default mostpopular;
