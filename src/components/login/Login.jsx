import React from "react";

import RegisterWithMail from "./RegisterWithMail";
import LoginWithMail from "./LoginWithEmail";
import "../../css/login/login.css";
const Login = () => {
  return (
    <div>
      <p className="login-p">Create an account</p>
      <RegisterWithMail />
      <p className="login-p">Already have an account? Sign in!</p>
      <LoginWithMail />
    </div>
  );
};

export default Login;
