"use client";
import LandingMain from "@/components/LandingMain";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import { Client, Account, Databases, ID, Permission, Role, Query } from "appwrite";
import { useEffect, useState } from "react";
import Login from "./login/page";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");



export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const getSession = async () => {
    try {
      const res = await account.get();
      setCurrentUser(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUser = async () => {
    if (currentUser.email !== undefined) {
     await database.listDocuments(
       "646b59b272a61a1153b6",
       "646b59c378966245428a",
       [
         Query.equal("email", [currentUser.email])
       ]
     ).then((res) => {
       setUserData(res.documents[0]);
      setLoading(false);

     }).catch((err) => console.log(err));
     
   }
 };

 useEffect(() => {
  // console.log("useEffect");
  if (currentUser) {
    getUser();
  }
}, [currentUser]);

 
  useEffect(() => {
    getSession();
  }, [account]);

  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      // router.rea
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    
    <main className="h-screen max-h-screen overflow-hidden font-workSans">
      {currentUser ? (
        <>
          <NavBar userData={userData} />
          <LandingMain />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
