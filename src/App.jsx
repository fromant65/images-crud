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
  //If the user is already logged in, we set the current user to it's email
  //Otherwise, we set it to null (because we didn't checked if there's a logged in user yet)
  const [currentUser, setCurrentUser] = useState(
    auth?.currentUser?.email || null
  );

  //Checking if there's a logged in user and setting the state to its email
  //If it is not, then we set current user to an empty string (we've alredy checked if it existed)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.email || "");
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      {/*If we didn't check if theres a logged user yet, we return a blank page.
      Once we check it, we return the login page if there's no logged in user
      or the user page if there's an user */}
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {currentUser === null ? (
          ""
        ) : currentUser === "" ? (
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
