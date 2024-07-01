import { React, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../userContext.jsx";

function signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, message },
  } = useForm();

  const [redirect, setredirect] = useState(false);
  const {setUser} = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const userinfo = await axios.post("/login", data);
      setUser(userinfo.data);
      alert("Login Succesfully");
      setredirect(true);
    } catch (err) {
      console.log(err)
      alert("Login Failed!");
    }
  };


  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container flex flex-col justify-center items-center h-[100vh] bg-slate-700">
        <div className="signup flex flex-col gap-2 justify-center items-center bg-teal-300 border-3 border-black p-5">
          <h1 className="h11 font-bold pb-2">Sign up</h1>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="border-2 border-black p-1"
              placeholder="Enter your email"
              type="email"
              {...register("email")}
            />
            <input
              className="border-2 border-black p-1"
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <button
              className="border-2 border-black bg-blue-400 p-1"
              type="submit"
            >
              Sign up
            </button>
          </form>
          <Link to="/Register">
            <p>Don't have an account?</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default signup;
