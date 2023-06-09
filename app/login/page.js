"use client";
import React, { useEffect, useState } from "react";
import { Client, Account, Databases, ID, Permission, Role } from "appwrite";
import { useRouter } from "next/navigation";
import LoginMain from "@/components/LoginMain";
import Head from "next/head";

const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const Login = () => {
  const router = useRouter();

  const handleSignup = () => {
    account.createOAuth2Session(
      "google",
      "http://localhost:3000/profile"
    );
    console.log("done");
  };

  // const handleSignup = async () => {
  //   await account.createOAuth2Session(
  //     "google",
  //     "http://localhost:3000"
  //     "http://localhost:3000"
  //   )
  // }

  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState(null);

  const getSession = async () => {
    try {
      const res = await account.get();
      setUser(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSession();
  }, [account]);

  return (
    <div className="h-screen max-h-screen overflow-hidden font-workSans">
      <Head>
        <title>Login | TalentBolt</title>
      </Head>
      {user ? (
        <>
        {router.back()}
        </>
      ) : (
        <>
          <LoginMain />
        </>
      )}
    </div>
  );
};

export default Login;
