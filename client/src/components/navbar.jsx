import { React, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../userContext";
import axios from "axios";
import adv from "./homecomponents/image/room1.jpg"

function navbar() {
  let { pathname } = useLocation();

  const { setUser } = useContext(UserContext);
  const { redirect, setRedirect } = useState("");

  async function logout() {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }

  function classes(type = null) {
    let classe = "flex flex-row items-center gap-1 px-2 py-[10px] rounded-lg ";
    if (type === pathname) {
      classe += "text-[#4B70F5] bg-[#EEF7FF]";
    }
    return classe;
  }

  return (
    <>
      <nav className="nav w-1/5 min-h-[96vh] top-2 fixed flex flex-col px-5 py-8 bg-[#ffffff] justify-around items-left shadow-sm rounded-md ml-2">
        <div className="logo  py-4">Gotham Hotel</div>
        <div className="list ">
          <ul className="flex h-[35vh] flex-col gap-1 justify-around">
            <Link className={classes("/")} to={"/"}>
              <span class="material-symbols-outlined">home</span>
              <li>Home</li>
            </Link>
            <Link className={classes("/notifications")} to={"/notifications"}>
              <span class="material-symbols-outlined">notifications</span>
              <li>Notifications</li>
            </Link>
            <Link className={classes("/wishlist")} to={"/wishlist"}>
              <span class="material-symbols-outlined">favorite</span>
              <li>Wishlist</li>
            </Link>
            <Link className={classes("/cart")} to={"/cart"}>
              <span class="material-symbols-outlined">shopping_cart</span>
              <li>Cart</li>
            </Link>
            <Link className={classes("/settings")} to={"/settings"}>
              <span class="material-symbols-outlined">settings</span>
              <li>Setting</li>
            </Link>
          </ul>
        </div>
        <div className="bottom ">
          <div className="advertisement w-[75%] ml-[10%]  rounded-md">
            <img
              src={adv}
              className="h-[150px] rounded-md object-cover"
              alt="advertisement"
              srcset=""
            />
          </div>
          <div className="logout py-5 flex flex-row items-center gap-1 px-2">
            <span class="material-symbols-outlined">logout</span>
            <button onClick={logout}>Sign out</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default navbar;
