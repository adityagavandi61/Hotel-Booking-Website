import React, { useContext, useState } from 'react';
import { Link, useParams,Navigate } from "react-router-dom";
import Newroom from './newroom.jsx';
import Dashboard from './dashboarpage.jsx';
import Booking from './booking.jsx';
import Advertisedpage from '../advertised/advertisedpage.jsx';
import axios from 'axios';
import { UserContext } from '../../userContext.jsx';

function dashboard() {
  const [redirect,setRedirect]=useState(null)
  const { user, ready, setUser } = useContext(UserContext);
  let {subpage}=useParams();
  if (subpage === undefined) {
    subpage = 'dashboard'
  }
  function classes(type = null){
    let classe = "rounded-lg py-2 font-semibold ";
    if (type === subpage ) {
      classe += " bg-red-700 text-white";
    }else{
      classe += " bg-gray-300 text-gray-600"
    }
    return classe;
  }
  if (!user && ready && !redirect) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }

  return (
    <>
      <section className='mb-16'>
        <div className="head m-2 p-11 flex flex-col space-y-4">
          <div className="Logo">
            <h2 className=' font-bold text-2xl'>Dashboard of GHotel</h2>
            <button
                  onClick={logout}
                  className="py-1 px-5 bg-red-700 rounded-full text-white "
                >
                  Log out
                </button>
          </div>
          <div className="text">
            <h3 className='font-semibold'>Welcome Manager</h3>
          </div>
            <ul className='grid grid-cols-4 gap-6 text-center text-base'>
            <Link to={'/dashboard'}><li className={classes("dashboard")}>Dashboard</li></Link>
            <Link to={'/dashboard/addroom'}><li className={classes("addroom")}>Add/Edit Room</li></Link>
            <Link to={'/dashboard/bookings'}><li className={classes("bookings")}>Bookings</li></Link>
            <Link to={'/dashboard/feedbacks'}><li className={classes("feedbacks")}>View Feedbacks</li></Link>
            <Link to={'/dashboard/advertised'}><li className={classes("advertised")}>make your banner</li></Link>
            </ul>
          </div>
          <div className="container m-2 px-11 flex flex-col space-y-4">
          {subpage === "dashboard" && (
            <Dashboard/>
          )}
          {subpage === "addroom" && (
            <Newroom/>
          )}
          {subpage === "bookings" && (
            <>
              <Booking/>
            </>
          )}
          {subpage === "feedbacks" && (
            <>
              <div className="feedbacks">feedbacks</div>
            </>
          )}
          {subpage === "advertised" && (
            <Advertisedpage/>
          )}
          </div>
      </section>
    </>
  )
}

export default dashboard;
