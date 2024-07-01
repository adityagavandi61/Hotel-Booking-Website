import React,{useContext} from "react";
import Header from "./homecomponents/header";
import Main from "./homecomponents/mainsection";
import Account from "./homecomponents/account";
import Navbar from "./navbar";
import { UserContext } from "../userContext";
import Accountt from "./homecomponents/accountt";
function home() {
  const { user} = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Header />
      <Main />
      {!user ? <Accountt/> : <Account />}
    </>
  );
}

export default home;
