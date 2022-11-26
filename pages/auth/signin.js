import Head from "next/head";
import React from "react";
import Authform from "../../components/Authform";
const signin = () => {
  return (
    <>
      <Head>
        <title>Sign In - BlogSpace</title>
        <meta
          name="description"
          content="
          Sign in to your BlogSpace account. We will help you to create a unique and beautiful blog."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Authform authtype="signin" />
      
    </>
  );
};

export default signin;
