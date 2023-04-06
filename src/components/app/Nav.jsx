import React from "react";
import Logout from "../Logout";
import { UserContext } from "../../App";
import { useContext } from "react";
import "../../css/app/nav.css";
const Nav = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className="nav">
      <p>{currentUser}</p>
      <Logout />
    </nav>
  );
};

export default Nav;
