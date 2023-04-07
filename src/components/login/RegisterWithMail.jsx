import React, { useState } from "react";
import { auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LoginWithGoogle from "./LoginWithGoogle";
import "../../css/login/register-with-mail.css";

const RegisterWithMail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function validatePassword() {
    return password === confirmPassword;
  }

  async function registerUser() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setErrorMessage(err.message);
      console.error(err);
    }
  }

  async function handleEmailRegister() {
    const isPasswordCorrect = validatePassword();
    if (!isPasswordCorrect) {
      setErrorMessage(`Passwords don't match`);
      return;
    }
    setErrorMessage("");
    registerUser();
  }
  return (
    <div className="register-form">
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
      <input
        className="input"
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="button register-button" onClick={handleEmailRegister}>
        Sign up
      </button>
      <div className="register-button">
        <LoginWithGoogle />
      </div>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
};

export default RegisterWithMail;
