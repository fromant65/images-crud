import React from "react";
import Logout from "../Logout";
import { UserContext } from "../../App";
import { useContext } from "react";
import "../../css/app/nav.css";

//In this component we show a simple nav with the username and the logout button

const Nav = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className="nav">
      <p className="current-user">{currentUser}</p>
      <Logout />
    </nav>
  );
};

export default Nav;
