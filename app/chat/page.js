"use client";

import Login from "@/app/login/page";
import DefalutMain from "@/components/ChatApp/DefalutMain";
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import {
  Client,
  Account,
  Databases,
  ID,
  Permission,
  Role,
  Query,
} from "appwrite";
import { useEffect, useState } from "react";


const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

export default function Home() {
  // const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    try {
      const res = await account.get();
      setCurrentUser(res);
      // setLoading(false);
      // console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUser = async () => {
    if (currentUser.email !== undefined) {
      await database
        .listDocuments("646b59b272a61a1153b6", "646b59c378966245428a", [
          Query.equal("email", [currentUser.email]),
        ])
        .then((res) => {
          setUserData(res.documents[0]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    // console.log("useEffect");
    getSession();
  }, []);

  useEffect(() => {
    // console.log("useEffect");
    if (currentUser) {
      getUser();
    }
  }, [currentUser]);

  if (loading) return <Loading />;

  return (
    <main className="h-screen max-h-screen overflow-hidden font-workSans">
      {currentUser ? (
        <>
          <NavBar userData={userData} />
          <DefalutMain userData={userData}  />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
