import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";

function booking() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    axios.get("/book").then(({ data }) => {
      setBook(data);
    });
  }, []);

  return (
    <>
      <div className="bookings flex flex-col gap-3">
        {book.length > 0 &&
          book.map((book) => (
            <Link
              to={"/dashboard/bookings/" + book._id}
              key={book._id}
              className="card-container justify-between items-center flex flex-row gap-2 w-[90%] border-2 rounded-lg shadow-md border-black p-2"
            >
              <div className="flex flex-row gap-2">
                <div className="rounded-xl flex border-2 relative w-[90px] h-[100px]">
                  {book.room.addphoto && (
                    <img
                      className=" object-cover rounded-xl"
                      src={
                        "http://localhost:3000/uploads/" + book.room.addphoto[0]
                      }
                      alt=""
                    />
                  )}
                </div>
                <div>
                  <h2 className="te font-semibold text-lg">
                    {book.name}
                  </h2>
                  <p className="te text-base mb-1 text-gray-600">
                    Book for <b>{book.room.title} </b>Room
                  </p>
                  <p className="te text-base mb-1 text-gray-600">
                    From <b>{format(new Date(book.checkIn), "dd-MM-yyyy")}</b>{" "}
                    To <b>{format(new Date(book.checkOut), "dd-MM-yyyy")}</b>
                  </p>
                </div>
              </div>
              <div className="price pr-5 ">
                <span>
                  Total Price:
                  {book.price}
                </span>
                <br />
                <span>
                  Nights:
                  {differenceInCalendarDays(
                    new Date(book.checkOut),
                    new Date(book.checkIn)
                  )}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default booking;
