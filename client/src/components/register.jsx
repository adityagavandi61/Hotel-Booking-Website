import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/register", data);
      alert("Register Succesfully");
    } catch (err) {
      alert("Email already taken");
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center h-[100vh] bg-slate-700">
      <div className="signup flex flex-col gap-2 justify-center items-center bg-teal-300 border-3 border-black p-5">
        <h1 className="h11 font-bold pb-2">User Registration</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <input 
          className="border-2 border-black p-1"
            type="text"
            name="name"
            placeholder="Fullname"
            {...register("name")}
          />
          <input  className="border-2 border-black p-1"
            type="email"
            name="email"
            placeholder="Email"
            {...register("email")}
          />
          <input className="border-2 border-black p-1"
            type="password"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
          <button className="border-2 border-black bg-blue-400 p-1" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default register;
