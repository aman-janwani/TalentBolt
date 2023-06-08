import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Image from "next/image";
import { Client, Databases, Query } from "appwrite";

const client = new Client();

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const DefalutMain = ({userData}) => {
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const res = await database
      .listDocuments("646b59b272a61a1153b6", "647f31b63e9c1f6ba567")
      .then((res) => {
        console.log(res.documents);
        res.documents.map((chat) => {
          if (chat.users.includes(userData.$id)) {
            // console.log(chat, userData.$id);
            setChats((prev) => [...prev, chat]);
          }
        })
      })
      .catch((err) => console.log(err));
  };

  console.log(chats);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="bg-[#111111]/5 flex justify-center h-screen px-[60px] py-[40px]">
      <div className="w-full h-[90%] flex items-start overflow-y-hidden bg-white rounded-[20px]">
        <SideBar chats={chats} userData={userData} />
        <div className="p-5 flex items-center justify-center w-full">
          <div className="relative h-[500px] w-[500px]">
            <Image
              className="object-contain"
              src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1686146995/TalentBolt/undraw_online_chat_re_c4lx_1_n7yrm5.svg"
              fill={true}
              alt="chat"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefalutMain;
