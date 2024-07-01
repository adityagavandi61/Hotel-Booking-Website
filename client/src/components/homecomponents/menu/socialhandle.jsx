import React from "react";
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import twitter from "../../assets/twitter.svg";

function socialhandle() {
  return (
    <div className="socialmediahandle flex justify-around  bottom-1">
      <img src={instagram} alt="" />
      <img src={facebook} alt="" />
      <img src={twitter} alt="" />
      <img src={youtube} alt="" />
    </div>
  );
}

export default socialhandle;
