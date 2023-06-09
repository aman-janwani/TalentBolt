"use client";
import RegisterMain from "@/components/RegisterMain";
import React, { useEffect, useState } from "react";
import { Client, Account, Databases, ID, Permission, Role, Query } from "appwrite";
import ProfileMain from "@/components/ProfileMain";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Login from "../login/page";
import Head from "next/head";

const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const Register = () => {
  return (
    <div>
      <RegisterMain />
    </div>
  );
};

const Profile = () => {
  const router = useRouter();
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
      await database.listDocuments(
        "646b59b272a61a1153b6",
        "646b59c378966245428a",
        [
          Query.equal("email", [currentUser.email])
        ]
      ).then((res) => {
        setUserData(res.documents[0]);
        console.log(res, "res");
        if (res.documents.length > 0) {
          setIsAvailable(true);
          setLoading(false);
        } else {
          setIsAvailable(false);
          setLoading(false);
        }
      }).catch((err) => {
        console.log(err);
      });
      
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
    <div className="font-workSans">
      <Head>
        <title>Profile | TalentBolt</title>
      </Head>
      {currentUser ? (
        <>
          {isAvailable ? (
            <ProfileMain userData={userData} />
          ) : (
            <Register />
          )}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Profile;
