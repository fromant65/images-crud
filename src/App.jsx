import { useEffect, useState } from "react";
import React from "react";
import Login from "./components/login/Login";
import Nav from "./components/app/Nav";
import Gallery from "./components/app/Gallery";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./app.css";

export const UserContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(
    auth?.currentUser?.email || ""
  );

  useEffect(() => {
    setCurrentUser(auth?.currentUser?.email || "");
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.email || "");
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {currentUser === "" ? (
          <div className="sign-up-container">
            <Login />
          </div>
        ) : (
          <div className="signed-up-container">
            <Nav />
            <Gallery />
          </div>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
