import React, { useContext, useState, useEffect } from "react";
import pic1 from "../homecomponents/image/header1.jpg";
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";

function roompage() {
  const { id } = useParams();
  const [roominfo, setRoominfo] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/roompage/" + id).then((response) => {
      const { data } = response;
      setRoominfo(data);
    });
  }, [id]);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "roompage";
  }
  function popupopen() {
    const open = document.getElementById("popopen");
    open.classList.remove("hidden");
  }

  function popupclose() {
    const close = document.getElementById("popopen");
    close.classList.add("hidden");
  }
  function redirectt() {
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to={"/booking/" + id}></Navigate>;
  }
  return (
    <>
      <section className="container mt-2 rounded-md min-h-[105vh] border-2 flex flex-col ml-[21%] w-[78%]">
        <div className="main p-3 flex flex-row gap-2">
          <div className="left w-[70%]">
            <div className="photos">
              <div className="img-container w-full lg:h-auto object-cover object-center rounded">
                <div className="img-grid grid grid-cols-5 gap-3 p-2 items-start">
                  <div className="gr row-span-3 col-span-3">
                    {roominfo.addphoto && (
                      <img
                        className="w-full h-[375px] object-cover rounded imghover"
                        src={
                          "http://localhost:3000/uploads/" +
                          roominfo.addphoto[0]
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <div className="gr">
                    {roominfo.addphoto && (
                      <img
                        className="w-full h-[180px] object-cover rounded imghover"
                        src={
                          "http://localhost:3000/uploads/" +
                          roominfo.addphoto[1]
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <div className="gr">
                    {roominfo.addphoto && (
                      <img
                        className="w-full h-[180px] object-cover object-center rounded imghover"
                        src={
                          "http://localhost:3000/uploads/" +
                          roominfo.addphoto[2]
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <div className="gr">
                    {roominfo.addphoto && (
                      <img
                        className="w-full h-[180px] object-cover object-center rounded imghover"
                        src={
                          "http://localhost:3000/uploads/" +
                          roominfo.addphoto[3]
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <div className="gr relative imghover ">
                    <button
                      onClick={popupopen}
                      className="popup-open bg bg-[#000000ab] flex flex-row items-center justify-center text-white absolute rounded z-10 w-full h-full"
                    >
                      view all images
                    </button>
                    {roominfo.addphoto && (
                      <img
                        className="w-full h-[180px] object-cover object-center rounded"
                        src={
                          "http://localhost:3000/uploads/" +
                          roominfo.addphoto[4]
                        }
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="head">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {roominfo.title}
              </h1>
            </div>
            <div className="flex w-1/2">
              <div className="text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1 w-full">
                Description
              </div>
            </div>
            <p className="leading-relaxed mb-4">{roominfo.description}</p>
            <div className="offer">
              <h2 className="text-xl font-semibold">This place offers</h2>
              <div className="o-f pt-2 grid grid-cols-3 gap-2 text-center text-base">
                {roominfo?.perks?.length > 0 &&
                  roominfo.perks.map((perks) => (
                    <span
                      className="flex flex-row items-center gap-2"
                      key={perks}
                    >
                      <img
                        className="w-5"
                        src={
                          "http://localhost:5173/src/components/assets/" +
                          perks +
                          ".svg"
                        }
                        alt=""
                      />
                      {perks}
                    </span>
                  ))}
              </div>
            </div>
            <div className="reviews mt-2 py-2 mr-2">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="r-card flex flex-col my-2 pb-2 border w-full p-2">
                <div className="head">
                  <div className="user flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={pic1}
                        alt=""
                        className="rounded-full w-[50px]"
                      />
                      <div className="as">
                        <h2 className="font-bold">Mr. Aditya Gavandi</h2>
                        <span>4 out of 5</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="r-card2 pt-1">
                  <h3 className="font-bold">Good service</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quae itaque alias officia aliquam eius atque odit iste Lorem
                    ipsu
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="right m-2 flex flex-col gap-2 w-[29%]">
            <div className="locotion border h-[470px] rounded-md">location</div>
            <div className="book">
              <div className="flex">
                <button
                  onClick={redirectt}
                  id="book"
                  className="flex w-full mx-1 items-end justify-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  <b>₹ {roominfo.price}.00</b>
                  <small>/night</small>
                </button>
              </div>
            </div>
            <div className="bookinfo">
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Bed</span>
                <span className="ml-auto text-gray-900">{roominfo.bed}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">CheckIn</span>
                <span className="ml-auto text-gray-900">
                  {roominfo.CheckIn}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">CheckOut</span>
                <span className="ml-auto text-gray-900">
                  {roominfo.CheckOut}
                </span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Max Guest</span>
                <span className="ml-auto text-gray-900">
                  {roominfo.MaxGuestAdult} Adult {roominfo.MaxGuestChild} Child
                </span>
              </div>
            </div>
          </div>
        <div
          onClick={popupclose}
          id="popopen"
          className="popup hidden m-auto z-20 w-full h-full top-0  absolute bg-[#000000ab]"
        >
          <div className="delete text-white p-4  text-2xl flex flex-row justify-end items-center">
            <button className="X px-2 cursor-pointer">X</button>
          </div>
          <div className="images-container flex flex-row overflow-x-scroll p-12 gap-2 ">
            {roominfo.addphoto?.length > 0 &&
              roominfo.addphoto.map((pic) => (
                <img
                  className="w-[800px] h-[700px] object-contain top-5"
                  key={pic}
                  src={"http://localhost:3000/uploads/" + pic}
                  alt=""
                />
              ))}
          </div>
        </div>
        </div>

        {/* <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5  mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {roominfo.title}
              </h1>
              <div className="flex mb-4">
                <div className={classes("roompage")}>Description</div>
              </div>
              <p className="leading-relaxed mb-4">{roominfo.description}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Bed</span>
                <span className="ml-auto text-gray-900">{roominfo.bed}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">CheckIn</span>
                <span className="ml-auto text-gray-900">
                  {roominfo.CheckIn}
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">CheckOut</span>
                <span className="ml-auto text-gray-900">
                  {roominfo.CheckOut}
                </span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Max Guest</span>
                <span className="ml-auto text-gray-900">
                  {roominfo.MaxGuestAdult} Adult {roominfo.MaxGuestChild} Child
                </span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {roominfo.price}.00/Day INR.
                </span>
                <button onClick={redirectt} id="book" className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Book
                </button>
              </div>
              <div className="offer">
                <h2 className="text-xl font-semibold">This place offers</h2>
                <div className="o-f pt-2 grid grid-cols-3 gap-2 text-center text-base">
                  {roominfo?.perks?.length > 0 &&
                    roominfo.perks.map((perks) => (
                      <span
                        className="flex flex-row items-center gap-2"
                        key={perks}
                      >
                        <img
                          className="w-5"
                          src={
                            "http://localhost:5173/src/components/assets/" +
                            perks +
                            ".svg"
                          }
                          alt=""
                        />
                        {perks}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="img-container lg:w-1/2 w-[full] lg:h-auto h-64 object-cover object-center rounded">
              <div className="img-grid grid grid-cols-4 gap-1">
                <div className="gr row-span-3 col-span-3">
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-full object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[0]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="gr">
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-[130px] object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[1]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="gr">
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-[130px] object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[2]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="gr">
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-[130px] object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[3]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="gr">
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-[130px] object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[4]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="gr">
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-[130px] object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[5]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="gr">
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-[130px] object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[6]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="gr relative ">
                  <button
                    onClick={popupopen}
                    className="popup-open bg bg-[#000000ab] flex flex-row items-center justify-center text-white absolute rounded z-10 w-full h-full"
                  >
                    view all images
                  </button>
                  {roominfo.addphoto && (
                    <img
                      className="w-full h-[130px] object-cover object-center rounded"
                      src={
                        "http://localhost:3000/uploads/" + roominfo.addphoto[7]
                      }
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="reviews w-full pr-5 pt-5">
              <h2 className="font-bold">Reviews</h2>
              <div className="r-card flex flex-col m-2 pb-2 border-2 border-black w-full p-3">
                <div className="head">
                  <div className="user flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={pic1}
                        alt=""
                        className="rounded-full w-[55px]"
                      />
                      <div className="as">
                        <h2 className="font-bold">Mr. Aditya Gavandi</h2>
                        <span>Review:time</span>
                      </div>
                    </div>
                    <div className="rating">4 out of 5</div>
                  </div>
                </div>
                <div className="r-card2 pl-3 pt-1">
                  <h3 className="font-bold">Good service</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quae itaque alias officia aliquam eius atque odit iste Lorem
                    ipsu
                  </p>
                </div>
              </div>
              <div className="r-card flex flex-col m-2 pb-2 border-2 border-black w-full p-3">
                <div className="head">
                  <div className="user flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                      <img
                        src={pic1}
                        alt=""
                        className="rounded-full w-[55px]"
                      />
                      <div className="as">
                        <h2 className="font-bold">Mr. Aditya Gavandi</h2>
                        <span>Review:time</span>
                      </div>
                    </div>
                    <div className="rating">4 out of 5</div>
                  </div>
                </div>
                <div className="r-card2 pl-3 pt-1">
                  <h3 className="font-bold">Good service</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quae itaque alias officia aliquam eius atque odit iste Lorem
                    ipsu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={popupclose}
          id="popopen"
          className="popup hidden m-auto z-20 w-full h-full top-0  absolute bg-[#000000ab]"
        >
          <div className="delete text-white p-4  text-2xl flex flex-row justify-end items-center">
            <button className="X px-2 cursor-pointer">X</button>
          </div>
          <div className="images-container flex flex-row overflow-x-scroll p-12 gap-2 ">
            {roominfo.addphoto?.length > 0 &&
              roominfo.addphoto.map((pic) => (
                <img
                  className="w-[800px] h-[700px] object-contain top-5"
                  key={pic}
                  src={"http://localhost:3000/uploads/" + pic}
                  alt=""
                />
              ))}
          </div>
        </div> */}
      </section>
    </>
  );
}

export default roompage;
