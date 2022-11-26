/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Tabledata from "../components/Tabledata";
import { loadingico, downloadico, searchuserico } from "../components/icons";
import Head from "next/head";
import Showmsg from "../components/Showmsg";

export default function Home() {
  const { isAdmin, loading, setLoading, deleteContact } =
    useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showmsg, setShowmsg] = useState({
    show: false,
    id: "",
    name: "",
    email: "",
    message: "",
    createdAt: "",
    website: "",
  });
  const fetchContact = async () => {
    if (!isAdmin) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `https://contact-server-service.onrender.com/api/v1/contact/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${
              JSON.parse(localStorage.getItem("bsuser")).accessToken
            }`,
          },
        }
      );
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      alert("Something went wrong");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className=" w-full flex items-center justify-center mx-0 px-2 md:py-12">
      <Head>
        <title>FlexBoard</title>
        <meta
          name="description"
          content=" Publish blog in your way. Whether you’d like to share your knowledge, We will help you to create a unique and beautiful blog."
        />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <main className="flex justify-between flex-col  w-full max-w-7xl mb-52 md:mb-0">
        <div className="flex justify-start items-start flex-row mb-4 ">
          <div className="relative text-gray-600 focus-within:text-gray-400  ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="button"
                className="p-1 focus:outline-none focus:shadow-outline flex mx-auto text-white bg-purple-500 border-0  hover:bg-purple-600 rounded text-lg hover:drop-shadow-lg items-center h-min"
              >
                {React.createElement(searchuserico)}
              </button>
            </span>
            <input
              type="search"
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setFilteredContacts(
                  contacts.filter((contact) => {
                    return (
                      contact.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      contact.email.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                );
              }}
              className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700  px-4 leading-8 transition-colors duration-200 ease-in-out py-1  pl-12 focus:outline-none focus:bg-white"
              placeholder="Search..."
              autoComplete="off"
            />
          </div>

          <button
            className="flex mx-2 text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg hover:drop-shadow-lg items-center h-full"
            onClick={fetchContact}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <span className="h-full w-auto">
                {React.createElement(loadingico)}
              </span>
            ) : (
              <span className="h-full w-auto">
                {React.createElement(downloadico)}
              </span>
            )}
          </button>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <Tabledata
            data={filteredContacts.length > 0 ? filteredContacts : contacts}
            deleteContact={deleteContact}
            fetchContact={fetchContact}
            setShowmsg={setShowmsg}
          />
        </div>
        {showmsg.show && (
          <Showmsg
            setShowmsg={setShowmsg}
            id={showmsg.id}
            name={showmsg.name}
            email={showmsg.email}
            message={showmsg.message}
            website={showmsg.website}
            createdAt={showmsg.createdAt}
          />
        )}
      </main>
    </div>
  );
}
