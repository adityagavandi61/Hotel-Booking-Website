import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";

function recentbooking() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    axios.get("/recentbookings").then((response) => {
      setBook(response.data);
    });
  }, []);

  return (
    <>
      {book == 0 ? (
        <div></div>
      ) : (
        <div className="middle pb-5 mb-4 border-b-2">
          <div className="myrecentbooking flex items-center gap-1">
            <span className="material-symbols-outlined">history</span>
            <h5 className=" font-medium">Recent booking</h5>
          </div>
          {book.length > 0 &&
            book.map((book) => (
              <Link
                to={"/account/bookings/" + book._id}
                key={book._id}
                className="mybooking mt-3 flex gap-2 rounded-[7px] bg-[#ffffff] border shadow-sm hover:shadow-md transition-all"
              >
                {book.room.addphoto && (
                  <div className="img-container">
                    <img
                      src={
                        "http://localhost:3000/uploads/" + book.room.addphoto[0]
                      }
                      className="w-[80px] h-[90px] rounded-s-[7px] object-cover"
                      alt=""
                    />
                  </div>
                )}
                <div className="text-container">
                  <h3>{book.room.title} Room</h3>
                  <h5>
                    CheckIn:{format(new Date(book.checkIn), "dd-MM-yyyy")}
                  </h5>
                  <h5>Location</h5>
                </div>
              </Link>
            ))}
        </div>
      )}
    </>
  );
}

export default recentbooking;
