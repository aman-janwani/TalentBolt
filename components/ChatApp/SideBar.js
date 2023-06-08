import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React, { use } from "react";
import { Client, Databases, Query } from "appwrite";
import { useState } from "react";
import { useEffect } from "react";

const client = new Client();

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const SideBar = ({ chats, userData }) => {
  const router = useRouter();
  const prams = useParams();
  const [applicants, setApplicants] = useState([]);

  const getApplicants = async () => {
    if (userData.type === "business"){
      chats.map(async (chat) => {
        const res = await database.getDocument(
          "646b59b272a61a1153b6",
          "646b59c378966245428a",
          chat.users[1]
        ).then((res) => {
          console.log(res);
          // create a varriable to store res and also add an id to it        
          const res2 = {...res, chatId: chat.$id}
          setApplicants((prev) => [...prev, res2]);
        })
      });
    } else {
      chats.map(async (chat) => {
        const res = await database.getDocument(
          "646b59b272a61a1153b6",
          "646b59c378966245428a",
          chat.users[0]
        ).then((res) => {
          console.log(res);
          // create a varriable to store res and also add an id to it        
          const res2 = {...res, chatId: chat.$id}
          setApplicants((prev) => [...prev, res2]);
        })
      });
    }
  };
  useEffect(() => {
    getApplicants();
  }, [chats]);

  console.log(applicants);


  return (
    <div className="min-w-[400px] max-w-[400px] overflow-y-scroll h-full border-r-2 border-[#111111]/10">
      <div className="p-5">
        <p className="text-[#111111] font-semibold text-[20px]">Chats</p>
      </div>
      <div className="">
        {applicants.map((chat) => {
          return (
            <div
              key={chat.chatId}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/chat/${chat.chatId}`);
              }}
              className={`flex items-center cursor-pointer ${prams.id === chat.chatId ? ("bg-[#B270EE]/10") : ("bg-[#ffffff]")} hover:brightness-95 duration-300 px-[20px] gap-[10px] border-t-2 border-[#111111]/10 py-[15px]`}
            >
              <div className="relative w-[45px] h-[45px] rounded-full border-2 border-[#111111]/20">
                <Image
                  className="rounded-full object-contain"
                  src={chat.image}
                  fill={true}
                  alt="user image"
                />
              </div>
              <p className="text-[#111111] font-semibold">{chat.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
