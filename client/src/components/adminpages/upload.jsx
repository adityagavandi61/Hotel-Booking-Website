import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function upload({ addphoto, setaddedPhoto }) {
  async function uploadphoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    await axios
      .post("/uploads", data, {
        header: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setaddedPhoto((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  function removePhoto(filename) {
    setaddedPhoto([...addphoto.filter((photo) => photo !== filename)]);
  }
  function setAsMain(filename) {
    const addedphotowithoutselected = addphoto.filter(photo => photo !== filename);
    const newaddedphoto = [filename,...addedphotowithoutselected]
    setaddedPhoto(newaddedphoto)
  }
  return (
    <>
      <div className="flex flex-col">
        <h2 className="te font-semibold">Photo</h2>
        <p className="te text-xs mb-1 text-gray-600">add photo of room</p>
        <div className="flex flex-row w-1/2 flex-wrap pb-2 gap-2">
          {addphoto.length > 0 &&
            addphoto.map((link) => (
              <div className="relative" key={link}>
                <Link
                  to={"http://localhost:3000/uploads/" + link}
                  target="_blank"
                >
                  <img
                    className="w-[150px] object-cover h-[120px] border rounded-lg"
                    src={"http://localhost:3000/uploads/" + link}
                    alt=""
                  />
                </Link>
                <button
                  onClick={() => removePhoto(link)}
                  className="delete absolute bottom-2 right-2 bg-slate-400 rounded-lg p-[6px] z-10 cursor-pointer"
                >
                  D
                </button>
                {link === addphoto[0] && (
                  <button
                    onClick={() => setAsMain(link)}
                    className="delete absolute bottom-2 left-2 bg-slate-400 rounded-lg p-[6px] z-10 cursor-pointer"
                  >
                    S
                  </button>
                )}
                {link !== addphoto[0] && (
                  <button
                    onClick={() => setAsMain(link)}
                    className="delete absolute bottom-2 left-2 bg-slate-400 rounded-lg p-[6px] z-10 cursor-pointer"
                  >
                    a
                  </button>
                )}
              </div>
            ))}
          <label className="upload-img flex w-[150px] h-[80px]  border-2 items-center border-black px-6 py-4 rounded-[9px] cursor-pointer">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={uploadphoto}
              multiple
            />
            <svg
              className=" w-7"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="upload"
            >
              <path d="M5 10c-.6 0-1-.4-1-1 0-3.9 3.1-7 7-7 3 0 5.7 2 6.7 4.9.1.5-.1 1.1-.7 1.2-.5.2-1.1-.1-1.3-.6C15.1 5.4 13.2 4 11 4 8.2 4 6 6.2 6 9c0 .6-.4 1-1 1z"></path>
              <path d="M18 18c-.6 0-1-.4-1-1s.4-1 1-1c2.2 0 4-1.8 4-4s-1.8-4-4-4c-.3 0-.7 0-1 .1-.5.1-1.1-.2-1.2-.7s.2-1.1.7-1.2c.5-.1 1-.2 1.5-.2 3.3 0 6 2.7 6 6s-2.7 6-6 6zM8 18H5c-.6 0-1-.4-1-1s.4-1 1-1h3c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
              <path d="M18 18h-2c-.6 0-1-.4-1-1s.4-1 1-1h2c.6 0 1 .4 1 1s-.4 1-1 1zM5 18c-2.8 0-5-2.2-5-5s2.2-5 5-5c.6 0 1 .4 1 1s-.4 1-1 1c-1.7 0-3 1.3-3 3s1.3 3 3 3c.6 0 1 .4 1 1s-.4 1-1 1zm7 4c-.6 0-1-.4-1-1V11c0-.6.4-1 1-1s1 .4 1 1v10c0 .6-.4 1-1 1z"></path>
              <path d="M9 15c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3-3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3 3c-.2.2-.4.3-.7.3z"></path>
              <path d="M15 15c-.3 0-.5-.1-.7-.3l-3-3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3 3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"></path>
            </svg>
            <h3 className="font-bold text-l">Upload</h3>
          </label>
        </div>
      </div>
    </>
  );
}
