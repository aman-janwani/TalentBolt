import React from "react";
import SideBar from "./SideBar";
import Image from "next/image";

import { Client, Databases, ID, Query } from "appwrite";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import moment from "moment";

const client = new Client();

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const MainChats = ({ userData }) => {
  const prams = useParams();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  

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
        });
      })
      .catch((err) => console.log(err));
  };

  const getChat = async () => {
    const res = await database
      .getDocument("646b59b272a61a1153b6", "647f31b63e9c1f6ba567", prams.id)
      .then((res) => {
        console.log(res);
        setMessages(JSON.parse(res.messages));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getChats();
    getChat();
  }, []);

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      const res = await database
        .updateDocument(
          "646b59b272a61a1153b6",
          "647f31b63e9c1f6ba567",
          prams.id,
          {
            messages: JSON.stringify([
              ...messages,
              {
                message: message,
                sender: userData.$id,
                id: ID.unique(),
                time: Date.now(),
              },
            ]),
          }
        )
        .then((res) => {
          console.log(res);
          setMessages([
            ...messages,
            {
              message: message,
              sender: userData.$id,
              id: ID.unique(),
              time: Date.now(),
            },
          ]);
          setMessage("");
          getChat();
        });
    }
  };

  // const test = () => {
  //   client.subscribe(
  //     `collections.646b59b272a61a1153b6.documents.647f31b63e9c1f6ba567`,
  //     (data) => {
  //       console.log(data, "aaaa");
  //     }
  //   );
  // };

  // test();

  return (
    <div className="bg-[#111111]/5 flex justify-center h-screen px-[60px] py-[40px]">
      <div className="w-full h-[90%] flex items-start overflow-y-hidden bg-white rounded-[20px]">
        <SideBar chats={chats} userData={userData} />
        <div className="flex flex-col justify-end w-full h-full">
          <div className="flex-1 h-max overflow-y-scroll flex px-5 flex-col gap-[20px] py-[20px]">
            {messages.map((message) => {
              if (message.sender === userData.$id) {
                return (
                  <div key={message.id} className="text-right flex flex-col items-end gap-[4px]">
                    <p className="bg-[#111111]/10 text-[#111111] px-[15px] py-[5px] rounded-[10px] rounded-br-[0px]">
                      {message.message}
                    </p>
                    <p className="text-[#111111]/80 text-[14px]">
                      {moment(message.time).format("hh:mm a")}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div  key={message.id} className="text-left flex flex-col items-start gap-[4px]">
                    <p className="bg-[#111111] text-white px-[15px] py-[5px] rounded-[10px] rounded-bl-[0px]">
                      {message.message}
                    </p>
                    <p className="text-[#111111]/80 text-[14px]">
                      {moment(message.time).format("hh:mm a")}
                    </p>
                  </div>
                );
              }
            })}
          </div>
          <div className="w-full flex gap-[20px] p-5">
          <div
              onClick={() => {
                getChat();
              }}
              className="bg-[#5A189A] text-white cursor-pointer px-5 flex items-center justify-center rounded-[10px]"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            </div>

            {/* Input */}
            <input
              className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
              type="text"
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              onClick={sendMessage}
              className="bg-[#111111] text-white px-5 flex items-center justify-center rounded-[10px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChats;
