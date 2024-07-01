import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import { UserContext } from "../../userContext.jsx";

function booking() {
  const { id } = useParams();
  const [roominfo, setRoominfo] = useState([]);

  //   date
  const date = new Date();
  //   currentdate
  const currentDate = date.getDate();
  date.setDate(currentDate);
  const defaultValue = date.toLocaleDateString("en-CA");
  //   future date
  const futureDate = date.getDate() + 1;
  date.setDate(futureDate);
  const futureValue = date.toLocaleDateString("en-CA");

  const [checkIn, setCheckIn] = useState(defaultValue);
  const [checkOut, setCheckOut] = useState(futureValue);
  const [name, setName] = useState();
  const [phone, setPhone] = useState("");
  const [adultGuest, setAdultGuest] = useState("1");
  const [childGuest, setChildGuest] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let NumberofNights = 0;
  if (checkIn && checkOut) {
    NumberofNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/roompage/" + id).then((response) => {
      const { data } = response;
      setRoominfo(data);
    });
  }, [id]);

  
  async function handleSubmit(e) {
    e.preventDefault();
    if (id) {
      await axios.post("/booking", {
        name,
        phone,
        checkIn,
        checkOut,
        adultGuest,
        childGuest,
        room: roominfo._id,
        price: roominfo.price * NumberofNights,
      });
      alert("booked succefully");
    } else {
      alert("Booking Unsuceesful!");
    }
  }

  return (
    <>
    <section className="container mt-2 rounded-md min-h-[105vh] border-2 flex flex-col ml-[21%] w-[78%]">
      <div className="booked mx-8 my-4 py-14 flex flex-row justify-evenly items-start">
        <div id="left">
          <h1 className="h11 font-bold pb-2">Booking {roominfo.title} room </h1>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              className="border-2 border-black p-1"
              placeholder="Enter your name"
              value={name}
              required
              type="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border-2 border-black p-1"
              placeholder="Enter your phone number"
              required
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="">
              <div className="others grid grid-cols-2 mt-2 py-2 gap-1 px-3 border-2 rounded-md border-black">
                <div className="checkIn">
                  CheckIn: <br />
                  <input
                    type="date"
                    min={defaultValue}
                    className="px-1"
                    defaultValue={defaultValue}
                    placeholder="13:00"
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="checkIn">
                  CheckOut: <br />{" "}
                  <input
                    type="date"
                    min={defaultValue}
                    className="px-1"
                    placeholder="10:00"
                    defaultValue={futureValue}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />{" "}
                </div>
                <div className="checkIn col-span-2">
                  MaxGuest: <br />
                  <span>Adult:</span>
                  <input
                    type="number"
                    className="px-2"
                    placeholder="adult"
                    onChange={(e) => setAdultGuest(e.target.value)}
                  />
                  <span>Child:</span>
                  <input
                    type="number"
                    className="px-2"
                    placeholder="child"
                    onChange={(e) => setChildGuest(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              className="border-2 border-black bg-blue-400 p-1"
              type="submit"
            >
              Book
            </button>
          </form>
        </div>
        <div id="right">
          <div className="name">
            <h2>
              You are booking <b>{roominfo.title}</b> room
            </h2>
          </div>
          <div className="price">
            The price of Room is <b>₹ {roominfo.price}.00 per night</b>
          </div>
          <div className="cals">
            {NumberofNights > 0 && (
              <>
                <span>You book room for next {NumberofNights} days</span>
                <br />
                <span>
                  From <span className=" underline">{checkIn}</span> To{" "}
                  <span className=" underline">{checkOut}</span>
                </span>
              </>
            )}
          </div>
          <div className="t-price">
            The total price of Room is{" "}
            <b>₹ {roominfo.price * NumberofNights}.00</b>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

export default booking;
