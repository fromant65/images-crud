import { useEffect, useState } from "react";
import React from "react";
import Login from "./components/login/login";
import Logout from "./components/Logout";
import { auth } from "../config/firebase";
import "./app.css";

export const UserContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(
    auth?.currentUser?.email || ""
  );
  useEffect(() => {
    setCurrentUser(auth?.currentUser?.email || "");
  });
  return (
    <div className="App">
      <p>Current user: {currentUser}</p>
      <UserContext.Provider value={{ setCurrentUser }}>
        {currentUser === "" ? (
          <div className="sign-up-container">
            <Login />
          </div>
        ) : (
          <div className="signed-up-container">
            Signed Up!
            <Logout />
          </div>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
