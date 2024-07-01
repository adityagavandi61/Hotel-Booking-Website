import React, { createContext, useContext, useState,useEffect } from "react";
import { UserContext } from "../userContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import MyBooking from "./subpages/mybooking.jsx";


export default function accountpage() {
  const { redirect, setRedirect } = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "account";
  }

  if (!ready) {
    return "Loading....";
  }
  if (!user && ready && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function classes(type = null) {
    let classe = "py-2 px-6 ";
    if (type === subpage) {
      classe += "bg-red-700 rounded-full text-white";
    }
    return classe;
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
    <section className="body min-h-[105vh] shadow-sm flex flex-col ml-[21%] rounded-md w-[55%]">
      <div className="conatainer w-full p-[15vh] flex flex-col">
        <div className="boxc flex flex-col gap-4 p-3">
          <div className="btnt flex flex-row w-full justify-evenly">
            <Link className={classes("account")} to={"/account"}>
              <h1 className="tex text-base font-semibold">My Account</h1>
            </Link>
            <Link className={classes("booking")} to={"/account/booking"}>
              <h1 className="tex text-base font-semibold">My Bookings</h1>
            </Link>
          </div>
          {subpage === "account" && (
            <>
              <div className="account">
                <h1 className="wel font-bold">Welcome Mr. {user.name}</h1>
                <div className="from  m-2 p-2">
                  <form action="">
                    <h2 className="te font-semibold">Name</h2>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="border-2 rounded-md py-1 mb-1 px-2 border-black"
                      placeholder={user.name}
                    />
                    <h2 className="te font-semibold">Photo</h2>
                    <div className="upload-img w-[10%] border-2 border-black text-center px-3 py-4 rounded-[9px] cursor-pointer">
                      <h3 className="font-bold text-lg">+</h3>
                      <p className="hidden" id="upload-img">
                        add photo
                      </p>
                    </div>
                    <button type="submit">Upload</button>
                  </form>
                </div>
                <button
                  onClick={logout}
                  className="py-1 px-5 bg-red-700 rounded-full text-white "
                >
                  Log out
                </button>
              </div>
            </>
          )}
          {subpage === "booking" && (
            <MyBooking/>
          )}
        </div>
      </div>
      </section>
    </>
  );
}
