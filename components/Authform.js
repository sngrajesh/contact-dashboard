/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { loadingico } from "./icons";
import Link from "next/link";

const Authform = ({ authtype }) => {
  const router = useRouter();
  const {
    isError,
    isLogged,
    loading,
    signUpHandler,
    signInHandler,
    setisError,
  } = useContext(AuthContext);

  const [userFrom, setUserFrom] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setisError(false);
    if (isLogged) {
      router.push("/");
    }
  }, []);

  const handleFormChange = (e) => {
    setUserFrom({
      ...userFrom,
      [e.target.name]: e.target.value,
    });
  };

  const ValidateEmail = (email_id) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email_id.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ValidateEmail(userFrom.email)) {
      alert("Invalid email address!");
      return;
    }
    if (userFrom.password.length < 6) {
      alert("Password must be atleast 6 characters long!");
      return;
    }
    if (authtype === "signin") {
      const res = await signInHandler({
        email: userFrom.email,
        password: userFrom.password,
      });
      if (res === 200) {
        router.push("/");
      }
    }
    if (authtype === "signup") {
      if (userFrom.username.length < 6) {
        alert("Name must be atleast 6 characters long!");
        return;
      }
      const res = await signUpHandler(userFrom);
      if (res === 200) {
        router.push("/auth/signin");
      }
    }
  };

  return (
    <section className="text-gray-600 body-font lg:w-4/6 max-w-4xl mx-auto sm:w-full">
      <div className="container px-5 sm:px-2 py-16 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 hidden md:block">
          <div className="w-full flex h-64 mb-3 justify-center items-center lg:justify-start sm:mb-0">
            <img
              className="h-full object-cover object-center rounded"
              src="/auth.svg"
              alt=""
            />
          </div>
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Hey there, {authtype === "signin" ? "welcome back" : "welcome"}
          </h1>
          <p className="leading-relaxed mt-4">
            Now you are at the corner of the internet where you find the best
            content on the web. We are glad to have you here.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font ">
            {authtype === "signin" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-xs text-blue-500 mb-3">
            <Link
              href={authtype === "signin" ? "/auth/signup" : "/auth/signin"}
            >
              {authtype === "signin"
                ? "New User? Sign Up"
                : "Already have an account? Sign In"}
            </Link>
          </p>
          {authtype === "signup" && (
            <div className="relative mb-4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleFormChange}
              />
            </div>
          )}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleFormChange}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleFormChange}
            />
          </div>
          <button
            className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg hover:drop-shadow-lg items-center"
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <span className="h-full w-auto">
                {React.createElement(loadingico)}
              </span>
            ) : (
              "Submit"
            )}
          </button>
          {isError && (
            <p className="text-xs text-red-500 mt-3 text-center">
              There is an error in your form
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Authform;
