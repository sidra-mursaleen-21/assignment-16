import React, { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [userInformation, setUserInformation] = useState({});
  const navigate = useNavigate();

  const inputFields = (key, value) => {
    setUserInformation({ ...userInformation, [key]: value });
  };

  const signUp = (e) => {
    e.preventDefault();

    const { email, password } = userInformation;

    // sign up new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigate("/home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("you already have an account");
        // ..
      });
  };

  return (
    <>
      <div className="container">
        <h1>sign up</h1>
        <form onSubmit={signUp}>
          <Input
            onChange={(e) => inputFields(e.target.id, e.target.value)}
            id="username"
            required={true}
            type="text"
            label="user name"
            placeholder="write your username"
          />
          <Input
            onChange={(e) => inputFields(e.target.id, e.target.value)}
            id="email"
            required={true}
            type="email"
            label="email"
            placeholder="write your email"
          />
          <Input
            onChange={(e) => inputFields(e.target.id, e.target.value)}
            id="password"
            required={true}
            type="password"
            label="password"
            placeholder="write your password"
          />
          <p>
            alrady have an account ? <Link to="/">LogIn</Link>{" "}
          </p>
          <Button type="submit" text="sign up" />
        </form>
      </div>
    </>
  );
};

export default Signup;
