import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Client, Databases, ID } from "appwrite";

const client = new Client();

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const UsersAppliedCard = ({ user, userData, jobData }) => {
  const [isChatAlreadyExists, setIsChatAlreadyExists] = useState(false);
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState(null);


  const fetchAllChats = async () => {
    const res = await database
      .listDocuments("646b59b272a61a1153b6", "647f31b63e9c1f6ba567")
      .then((res) => {
        console.log(res.documents);
        setChats(res.documents);
        res.documents.map((chat) => {
          if (
            chat.users.includes(userData.$id) &&
            chat.users.includes(user.$id)
          ) {
            setIsChatAlreadyExists(true);
            setChatId(chat.$id);
            console.log("chat already exists");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if ((jobData !== null, userData !== null)) {
      fetchAllChats();
    }
  }, [jobData]);

  const handleCreateChat = async () => {
    console.log(isChatAlreadyExists);
    if (isChatAlreadyExists) {
      console.log("chat already exists");
      window.location.href = `/chat/${chatId}`;
    } else {
      const res = await database
        .createDocument(
          "646b59b272a61a1153b6",
          "647f31b63e9c1f6ba567",
          ID.unique(),
          {
            messages: "",
            users: [userData.$id, user.$id],
          }
        )
        .then((res) => {
          console.log(res);
          window.location.href = `/chat/${res.$id}`;
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };

  return (
    <div
      key={user.$id}
      className="flex flex-col items-center gap-[10px] p-5 bg-white border-2 border-[#111111]/20 rounded-[15px] w-[350px]"
    >
      <div className="relative w-[100px] h-[100px] rounded-full border-2 border-[#111111]/20">
        <Image
          className="rounded-full object-contain"
          src={user.image}
          fill={true}
          alt="user image"
        />
      </div>
      <p className="text-[24px] font-semibold text-[#111111]">{user.name}</p>
      <p className="text-[14px] text-[#111111]/80 text-center">{user.bio}</p>
      <p className="text-[12px] text-[#111111]/50">{user.email}</p>
      <button
        onClick={handleCreateChat}
        className="bg-[#111111] text-white font-medium px-[20px] py-[10px] rounded-[10px]"
      >
        Chat now
      </button>
    </div>
  );
};

export default UsersAppliedCard;
