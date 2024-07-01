import { React, useState, useEffect } from "react";
import Navbar from './components/navbar'
import Header from './components/homecomponents/header'
import Account from './components/homecomponents/account'

function cart() {
  return (
    <>
     <Navbar />
    <Header/>
      <section className="body min-h-[105vh] shadow-sm flex flex-col ml-[21%] rounded-md w-[55%]"></section>
    <Account/>
    </>
  );
}

export default cart;
