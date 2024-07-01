import React from "react";
import { Link } from "react-router-dom";
import Navbar from './components/navbar'
import Account from './components/homecomponents/account'

function settings() {
  return (
    <>
    <Navbar />
      <section className="body min-h-[105vh] shadow-sm flex flex-col ml-[21%] rounded-md w-[55%]"></section>
    <Account/>
    </>
  );
}

export default settings;
