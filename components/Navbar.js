/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLogged, signOutHandler } = useContext(AuthContext);

  return (
    <>
      <header className="text-gray-900 body-font shadow-bottom fixed top-0 left-0 bg-white w-full  bg-white-400 bg-clip-padding bg-opacity-80 backdrop-filter backdrop-blur-xl  border-b-gray-200 z-50">
        <div className="mx-auto flex  p-3 md:flex-row items-center justify-between max-w-7xl">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img
                src="/logo.png"
                alt=""
                className="h-12 w-12 md:h-14 md:w-14  bg-gray-100  rounded-full  p-1 "
              />
              <span className="ml-3 text-xl">
                {isLogged ? "Contact" : "Home"}
              </span>
            </div>
          </Link>

          {isLogged ? (
            <button
              onClick={signOutHandler}
              className="inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  hover:drop-shadow-lg hover:text-purple-600 text-center"
            >
              Sigh Out
            </button>
          ) : (
            <Link href={"/auth/signin"}>
              <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  hover:drop-shadow-lg hover:text-purple-600 text-center">
                Login
              </button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
