import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./perks";
import Upload from "./upload.jsx";
import axios from "axios";
import { Navigate } from "react-router-dom";

function addroompage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [addphoto, setaddedPhoto] = useState([]);
  const [price, setPrice] = useState("");
  const [bed, setBed] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [MaxGuestAdult, setMaxGuestAdult] = useState("");
  const [MaxGuestChild, setMaxGuestChild] = useState("");
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/addroom/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setaddedPhoto(data.addphoto);
      setPrice(data.price);
      setBed(data.bed);
      setDescription(data.description);
      setCheckIn(data.CheckIn);
      setCheckOut(data.CheckOut);
      setMaxGuestAdult(data.MaxGuestAdult);
      setMaxGuestChild(data.MaxGuestChild);
      setPerks(data.perks);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title,
      addphoto,
      price,
      bed,
      description,
      CheckIn,
      CheckOut,
      MaxGuestAdult,
      MaxGuestChild,
      perks,
    };
    if (id) {
      //update
      await axios.put("/places", {
        id,
        ...data,
      });
      setRedirect("/dashboard/addroom");
    } else {
      //new place
      await axios.post("/places", data);
      setRedirect("/dashboard/addroom");
    }
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }
  return (
    <>
      <div className="room-container m-2 p-11">
        <div className="head flex flex-row items-center">
          <Link
            className=" bg-red-600 rounded-lg px-2 py-1 flex flex-row items-center justify-center border-1 border-black text-white"
            to={"/dashboard/addroom"}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="te font-semibold text-lg pl-[18%] ">Add New Room</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="te font-semibold">Title</h2>
          <p className="te text-xs mb-1 text-gray-600">add title of room</p>
          <input
            type="text"
            placeholder="eg. Double"
            required
            className="border-2 rounded-md py-1 mb-1 px-2 border-black w-1/2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Upload addphoto={addphoto} setaddedPhoto={setaddedPhoto} />
          <h2 className="te font-semibold">Price</h2>
          <p className="te text-xs mb-1 text-gray-600">Price of room</p>
          <input
            type="text"
            className="border-2 w-1/2 rounded-md py-1 mb-1 px-2 border-black"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <h2 className="te font-semibold">Bed</h2>
          <p className="te text-xs mb-1 text-gray-600">Enter bed in room</p>
          <input
            type="text"
            className="border-2 w-1/2 rounded-md py-1 mb-1 px-2 border-black"
            value={bed}
            required
            onChange={(e) => setBed(e.target.value)}
          />
          <h2 className="te font-semibold">Description</h2>
          <p className="te text-xs mb-1 text-gray-600">Description of room</p>
          <textarea
            className=" w-1/2 border-2 rounded-md py-1 mb-1 px-2 border-black"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="perk">
            <h2 className="te font-semibold">Perks</h2>
            <p className="te text-xs mb-1 text-gray-600">Perks</p>
            <div className="perks w-1/2 grid grid-cols-3 gap-3">
              <Perks selected={perks} onChange={setPerks} />
            </div>
          </div>
          <div className="others grid grid-cols-2 w-1/2 mt-2 py-2 gap-1 px-3 border-2 rounded-md border-black">
            <div className="checkIn">
              CheckIn: <br />
              <input
                type="number"
                className="px-1"
                placeholder="13:00"
                value={CheckIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="checkIn">
              CheckOut: <br />{" "}
              <input
                type="number"
                className="px-1"
                placeholder="10:00"
                value={CheckOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />{" "}
            </div>
            <div className="checkIn col-span-2">
              MaxGuest:
              <input
                type="number"
                className="px-2"
                placeholder="adult"
                value={MaxGuestAdult}
                onChange={(e) => setMaxGuestAdult(e.target.value)}
              />{" "}
               <input
                type="number"
                className="px-2"
                placeholder="child"
                value={MaxGuestChild}
                onChange={(e) => setMaxGuestChild(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-1/2 border-2 rounded-md py-1 mb-1 px-2 border-white my-5 p-2 bg-red-700 text-white"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default addroompage;
