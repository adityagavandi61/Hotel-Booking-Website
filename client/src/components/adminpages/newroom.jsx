import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function newroom() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/rooms").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  function handleDelete(e,_id) {
    axios.delete('/delete',_id)
    location.reload()
  }

  return (
    <>
      <Link className="w-[200px]" to={"/dashboard/addroom/new"}>
        <li className=" bg-red-600 p-2 list-none w-[200px] flex justify-center text-white rounded-xl items-center">
          <span className="material-symbols-outlined">add</span>Add new room
        </li>
      </Link>
      {places.length > 0 &&
        places.map((place) => (
          <div key={place._id} className="card-container justify-between items-center flex flex-row gap-2 w-[90%] border-2 rounded-lg shadow-md border-black p-2">
            <div className="flex flex-row gap-2">
            <div className="rounded-xl flex border-2 relative w-[90px] h-[100px]">
                {place.addphoto && <img className=" object-cover rounded-xl" src={'http://localhost:3000/uploads/'+place.addphoto[0]} alt="" />}
            </div>
            <div>
              <h2 className="te font-semibold text-lg">{place.title}</h2>
              <p className="te text-base mb-1 text-gray-600">INR {place.price}.00/day</p>
            </div>
            </div>
            <div className="btn flex flex-row gap-4 pr-6 ">
              <Link to={'/dashboard/addroom/'+place._id} className=" bg-red-600 px-4 py-[9px] text-center text-white rounded-lg my-7" >Edit</Link>
              <button className=" bg-red-600 px-3 text-center text-white rounded-lg my-7" onClick={(e)=>{handleDelete(e,place._id)}}>Delete</button>
            </div>
          </div>
        ))}
    </>
  );
}

export default newroom;
