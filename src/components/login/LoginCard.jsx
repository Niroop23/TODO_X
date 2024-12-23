import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import UserinfoAtom from "../../recoil/UserinfoAtom";

const LoginCard = () => {
  //global
  const [userInfo, setUserInfo] = useRecoilState(UserinfoAtom);

  //local
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("username:", usernameRef?.current?.value);
    // console.log("password:", passwordRef?.current?.value);

    // Add your API call here
    const userCreds = {
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
    };

    fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        if (data?.status === "Successfully logged in") {
          localStorage.setItem("userStatus", true);
          setUserInfo(true);
        } else {
          localStorage.setItem("userStatus", false);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <div className="login-card-container">
        <header className="header-text">
          <div>
            <h1 className="login-heading">TodoX</h1>
          </div>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              className="login-input"
              id="name"
              type="text"
              placeholder="Username"
              ref={usernameRef}
            />

            <input
              className="login-input"
              id="password"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />

            <button
              type="submit"
              className="login-btn"
              id="Login"
              value="Submit"
            >
              Login
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default LoginCard;
