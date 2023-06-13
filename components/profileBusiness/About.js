import React, { useState } from "react";
import Modal from "react-modal";
import { Client, Account, Databases } from "appwrite";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(20, 15, 36, 0.6)",
    zIndex: 30,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    backgroundColor: "#fff",
    zIndex: 30,
  },
};



const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");


const About = ({userData}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [upAbout, setUpAbout] = useState(userData.about || "");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await database
      .updateDocument(
        "646b59b272a61a1153b6",
        "646b59c378966245428a",
        userData?.$id,
        {
          about: upAbout,
        }
      )
      .then((res) => {
        closeModal();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white rounded-[20px] px-[40px] py-[20px] flex flex-col items-end gap-[20px]">
      <div className="flex flex-col gap-[15px] items-start w-full">
        <p className="text-[24px] font-semibold text-[#111111]">About</p>
        <p className="text-[16px] text-[#11111]/80">
          {userData?.about || ""}
        </p>
      </div>
      <div>
        <button className="p-2 rounded-lg bg-[#111111] text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Edit Profile Intro"
      >
        <div className="w-[717px] h-min overflow-y-scroll">
          <div className="border-b border-[#111111]/25 flex items-center justify-start h-[68px] px-[25px]">
            <p className="text-[24px] font-semibold text-[#11111]">
              Edit Intro
            </p>
          </div>
          <div className="px-[25px] py-[20px] flex flex-col gap-[30px]">
            {/* Profile Pic */}
            <textarea
              className="bg-[#111111]/5 w-full h-[240px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25 py-[12px]"
              placeholder="A small description about your comapny ..."
              name=""
              id=""
              cols="30"
              rows="10"
              value={upAbout}
              onChange={(e) => setUpAbout(e.target.value)}
            ></textarea>
          </div>
          <div className="border-t border-[#111111]/25 flex items-center justify-end h-[68px] px-[25px]">
            <button
              onClick={handleSubmit}
              className="bg-[#5A189A] text-white w-[127px] h-[55px] flex items-center rounded-[15px] justify-center text-[20px] font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default About;
