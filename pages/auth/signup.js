import Head from "next/head";
import React from "react";
import Authform from "../../components/Authform";
const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign Up - BlogSpace</title>
        <meta
          name="description"
          content="
          Sign up to your BlogSpace account. We will help you to create a unique and beautiful blog."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Authform authtype="signup" />
    </>
  );
};

export default Signup;
