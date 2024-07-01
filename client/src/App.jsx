import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Notification from "./notificationpage.jsx";
import Wishlist from "./components/wishlist.jsx";
import Signup from "./components/signup";
import Room from "./components/subpages/roompage.jsx";
import Register from "./components/register";
import Cart from "./cart.jsx";
import Setting from "./settings.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "./userContext.jsx";
import Account from "./components/accountpaage.jsx";
import Dashboard from "./components/adminpages/dashboard.jsx";
import Addroompage from "./components/adminpages/addroompage.jsx";
import Booking from "./components/subpages/booking.jsx";
import Bookingdetails from "./components/adminpages/bookingdetails.jsx";
import DetailsBooking from "./components/subpages/detailsbooking.jsx";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/notifications",
      element: (
        <>
          <Notification />
        </>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <>
          <Wishlist />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Cart />
        </>
      ),
    },
    {
      path: "/settings",
      element: (
        <>
          <Setting />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    },
    {
      path: "/account/:subpage?",
      element: (
        <>
          <Navbar />
          <Account />
        </>
      ),
    },
    {
      path: "/account/:subpage/:id?",
      element: (
        <>
          <Navbar />
          <DetailsBooking />
        </>
      ),
    },
    {
      path: "/roompage/:id?",
      element: (
        <>
          <Navbar />
          <Room/>
        </>
      ),
    },
    {
      path: "booking/:id?",
      element: (
        <>
          <Navbar/>
          <Booking/>
        </>
      ),
    },
    {
      path: "/dashboard/:subpage?",
      element: (
        <>
          <Dashboard/>
        </>
      ),
    },
    {
      path: "/dashboard/addroom/new",
      element: (
        <>
          <Addroompage/>
        </>
      ),
    },
    {
      path: "/dashboard/addroom/:id",
      element: (
        <>
          <Addroompage/>
        </>
      ),
    },
    {
      path: "/dashboard/bookings/:id",
      element: (
        <>
          <Bookingdetails/>
        </>
      ),
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
      {/* <Footer /> */}
    </UserContextProvider>
  );
}

export default App;
