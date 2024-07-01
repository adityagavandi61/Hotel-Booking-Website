import { React } from "react";
import Newrooms from "./menu/newrooms";
import Mostpopular from "./menu/mostpopular";
import Specialoffer from "./menu/specialoffer";
import { Link } from "react-router-dom";
import Banner from "./menu/banner";

function card() {
  function specialoffer(e) {
    e.preventDefault;
    const hide = document.getElementById("specialOffer");
    const text2 = document.getElementById("so")
    hide.classList.remove("hidden");
    text2.classList.add("font-bold","border-blue-500","border-b-2");
    text2.classList.remove("hover:border-blue-500","hover:border-b-2")
    const show = document.getElementById("mostPopular");
    const text1 = document.getElementById("mp");
    text1.classList.remove("font-bold","border-blue-500","border-b-2")
    text1.classList.add("hover:border-blue-500","hover:border-b-2")
    show.classList.add("hidden");
  }

  function mostpopular(e) {
    e.preventDefault;
    const hide = document.getElementById("mostPopular");
    const text1 = document.getElementById("mp")
    hide.classList.remove("hidden");
    text1.classList.add("font-bold","border-blue-500","border-b-2");
    text1.classList.remove("hover:border-blue-500","hover:border-b-2")
    const show = document.getElementById("specialOffer");
    const text2 = document.getElementById("so");
    text2.classList.remove("font-bold","border-blue-500","border-b-2")
    text2.classList.add("hover:border-blue-500","hover:border-b-2")
    show.classList.add("hidden");
  }

  return (
    <>
      <section className="body min-h-[105vh] shadow-sm flex flex-col ml-[21%] rounded-md w-[55%]">
        <Newrooms />
        <Banner/>
        <div className="container py-1 pl-2 relative">
          <span className="flex justify-between items-center mx-2 mr-4">
            <div className="btn flex gap-8 items-center relative">
              <button onClick={mostpopular}>
                <h1
                  id="mp"
                  className="font-bold border-blue-500 border-b-2 pb-1"
                >
                  Most Popular
                </h1>
              </button>
              <button id="btn" onClick={specialoffer}>
                <h1
                  id="so"
                  className=" hover:border-blue-500 hover:border-b-2  pb-1"
                >
                  Special offers
                </h1>
              </button>
            </div>
            <div className="end flex items-center gap-1">
              <Link className=" text-sm pb-1 text-blue-400 hover:text-blue-300 hover:border-b-2 hover:border-blue-300">
                View All
              </Link>
            </div>
          </span>
        </div>
        <div id="mostPopular" className="">
          <Mostpopular />
        </div>
        <div id="specialOffer" className="hidden">
          <Specialoffer />
        </div>
      </section>
    </>
  );
}

export default card;
