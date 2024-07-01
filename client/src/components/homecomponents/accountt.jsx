import React, { useContext, useState } from "react";
import pic from "./image/room1.jpg";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Offers from "./menu/offers";
import Socialhandle from "./menu/socialhandle";

function account() {  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
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
              <Link to="/login">
                  <span>Sign up</span>
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
                      <Link
                        to="/login"
                        type="submit"
                        className={classNames(
                          focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        Sign in
                      </Link>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </button>
        </div>
        <Offers/>
        <Socialhandle/>
      </aside>
    </>
  );
}

export default account;
