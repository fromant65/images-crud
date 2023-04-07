import React, { useContext } from "react";
import { auth } from "../../../config/firebase";
import { googleProvider } from "../../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "../../App";
const LoginWithGoogle = () => {
  const { setCurrentUser } = useContext(UserContext);
  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      setCurrentUser(auth.currentUser.email);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <button className="button" onClick={handleGoogleLogin}>
        Sign up with Google
      </button>
    </div>
  );
};

export default LoginWithGoogle;
