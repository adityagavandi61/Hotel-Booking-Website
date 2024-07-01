import React from "react";
import Wifi from "../assets/Wifi.svg";
import ParkingSpot from "../assets/Parking Spot.svg"
import TV from "../assets/TV.svg";
import SwimmingPool from "../assets/Swimming Pool.svg"
import AC from "../assets/AC.svg"
import FreeDinner from "../assets/Free Dinner.svg"

function perks({selected,onChange}) {
  function handleclick(ev){
    const {checked,name}=ev.target;
    if (checked) {
      onChange([...selected,name])
    }else{
      onChange([...selected.filter(selectedName => selectedName !== name )])
    }
  }
  return (
    <>
      <span className="flex flex-row gap-1 items-center rounded-md border-2 px-2 py-2 border-black">
        <input type="checkbox" checked={selected.includes('Wifi')} name="Wifi" id="" onChange={handleclick} />
        <img className="w-5" src={Wifi} alt="" />
        <h5>Wifi</h5>
      </span>
      <span className="flex flex-row gap-1 items-center rounded-md border-2 px-2 py-2 border-black">
        <input type="checkbox" checked={selected.includes("Parking Spot")} name="Parking Spot" id="" onChange={handleclick} />
        <img className="w-5" src={ParkingSpot} alt="" />
        <h5>Parking Spot</h5>
      </span>
      <span className="flex flex-row gap-1 items-center rounded-md border-2 px-2 py-2 border-black">
        <input type="checkbox" checked={selected.includes("TV")} name="TV" id="" onChange={handleclick} />
        <img className="w-5" src={TV} alt="" />
        <h5>TV</h5>
      </span>
      <span className="flex flex-row gap-1 items-center rounded-md border-2 px-2 py-2 border-black">
        <input type="checkbox" checked={selected.includes("Swimming Pool")} name="Swimming Pool" id="" onChange={handleclick} />
        <img className="w-5" src={SwimmingPool} alt="" />
        <h5>Swimming Pool</h5>
      </span>
      <span className="flex flex-row gap-1 items-center rounded-md border-2 px-2 py-2 border-black">
        <input type="checkbox" checked={selected.includes("AC")} name="AC" id="" onChange={handleclick} />
        <img className="w-5" src={AC} alt="" />
        <h5>AC</h5>
      </span>
      <span className="flex flex-row gap-1 items-center rounded-md border-2 px-2 py-2 border-black">
        <input type="checkbox" checked={selected.includes("Free Dinner")} name="Free Dinner" id="" onChange={handleclick} />
        <img className="w-5" src={FreeDinner} alt="" />
        <h5>Free Dinner</h5>
      </span>
    </>
  );
}

export default perks;
