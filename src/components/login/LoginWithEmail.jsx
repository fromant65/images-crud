import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { UserContext } from "../../App";
import "../../css/login/login-with-mail.css";

const LoginWithMail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser } = useContext(UserContext);

  async function handleEmailLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage("");
      setCurrentUser(email);
      console.log("Logged in Successfully");
    } catch (err) {
      setErrorMessage(err.message);
      console.error(err);
    }
  }
  return (
    <div className="login-form">
      <input
        className="input"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="button" onClick={handleEmailLogin}>
        Sign in
      </button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default LoginWithMail;
