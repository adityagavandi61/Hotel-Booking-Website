import React, { useContext, useState } from "react";
import pic from "./image/room1.jpg";
import axios from "axios";
import Recentbooking from "./menu/recentbooking";
import { Link,Navigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserContext } from "../../userContext";
import Offers from "./menu/offers";
import Socialhandle from "./menu/socialhandle";

function account() {
  const { redirect, setRedirect } = useState("");
  const { user, ready, setUser } = useContext(UserContext);
  if (!ready) {
    return "Loading....";
  }
  if (!user && ready && !redirect) {
    return <Navigate to={"/"} />;
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
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
      <aside className="nav w-[23%] shadow-sm rounded-md ml-[76.5%] fixed top-2 h-[96vh] flex flex-col px-5 py-8 bg-[#ffffff]">
        <div className="a min-h-[10vh] pb-5 mb-4 border-b-2 flex justify-between items-center">
          <div className="ac-head flex items-start gap-2">
            <img
              src={pic}
              className=" rounded-full w-[60px] h-[60px] object-cover"
              alt=""
            />
            <div className="ac p-[6px]">
              <Link to={user ? "/account" : "/login"}>
                {!user ? (
                  <span>Sign up</span>
                ) : (
                  <>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <h6 className=" text-gray-400 font-extralight text-sm hover:text-gray-900 hover:underline-offset-1">
                      View Profile
                    </h6>
                  </>
                )}
              </Link>
            </div>
          </div>
          <button className="arrow">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Account settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={logout}
                        type="submit"
                        className={classNames(
                          focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </button>
        </div>
        <Recentbooking/>
        <Offers/>
        <Socialhandle/>
      </aside>
    </>
  );
}

export default account;
