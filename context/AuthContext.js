import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [localuser, setLocaluser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isError, setisError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setisError(false);
    const user = localStorage.getItem("bsuser");
    if (user) {
      setLocaluser(JSON.parse(user));
      setIsLogged(true);
      setIsAdmin(JSON.parse(user).isAdmin);
    }
  }, []);

  const signInHandler = async (user) => {
    setLoading(true);
    let res;
    try {
      res = await fetch(
        "https://contact-server-service.onrender.com/api/v1/auth/signin",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("bsuser", JSON.stringify(data));
        setIsLogged(true);
        setLocaluser(data);
        setIsAdmin(data.isAdmin);
      } else {
        setisError(true);
      }
    } catch (error) {
      setisError(true);
    }
    setLoading(false);
    return res.status;
  };

  const signUpHandler = async (user) => {
    setLoading(true);
    let res;
    try {
      res = await fetch(
        "https://contact-server-service.onrender.com/api/v1/auth/signup",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setisError(true);
    }
    if (res.status !== 200) {
      setisError(true);
    }

    setLoading(false);
    return res.status;
  };

  const signOutHandler = () => {
    localStorage.removeItem("bsuser");
    setIsLogged(false);
    setLocaluser(null);
    setIsAdmin(false);
  };

  const deteteContactHandler = async (id) => {
    setLoading(true);
    let res;
    try {
      res = await fetch(
        `https://contact-server-service.onrender.com/api/v1/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${
              JSON.parse(localStorage.getItem("bsuser")).accessToken
            }`,
          },
        }
      );
    } catch (error) {
      setisError(true);
    }
    setLoading(false);
    return res.status;
  };
 

  const deleteContact = async (id) => {
    if (!isAdmin) {
      return;
    }

    try {
      const res = await fetch(
        `https://contact-server-service.onrender.com/api/v1/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${
              JSON.parse(localStorage.getItem("bsuser")).accessToken
            }`,
          },
        }
      );
      
      return res;
    } catch (error) {
      setisError(true);
      console.log(res.status);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        isAdmin,
        isError,
        loading,
        localuser,
        setLoading,
        setisError,
        signInHandler,
        deleteContact,
        signUpHandler,
        signOutHandler,
        deteteContactHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
