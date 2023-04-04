import { useEffect, useState } from "react";
import React from "react";
import Login from "./components/login/login";
import Logout from "./components/Logout";
import { auth } from "../config/firebase";

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
        <Login />
        <Logout />
      </UserContext.Provider>
    </div>
  );
}

export default App;
