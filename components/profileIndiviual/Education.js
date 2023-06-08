import Image from "next/image";
import React, { useState } from "react";
import Modal from "react-modal";
import { Puff } from "react-loader-spinner";
import { Client, Account, Databases, ID, Permission, Role } from "appwrite";
import { useRouter } from "next/navigation";
import EducationOneComponent from "../ModelComponents/EducationOneComponent";

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

const Education = ({ userData }) => {
  const [education, setEducation] = useState(
    JSON.parse(userData.education).education
  );

  console.log(education);


  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  

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
          education: JSON.stringify({ education: education }),
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

  const handleAdd = (e) => {
    e.preventDefault();
    const newEducation = [
      ...education,
      {
        id: Math.random(10000),
        instituteName: "",
        degree: "",
        duration: "",
      },
    ];
    setEducation(newEducation);
  };

  // const [education, setEducation] = useState([
  //   {
  //     id: 1,
  //     instituteImage: "https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449091/TalentBolt/Frame_xhkws2.png",
  //     instituteName: "Google",
  //     degree: "Software Engineer",
  //     duration: "2019 - Present",
  //   },
  //   {
  //     id: 2,
  //     instituteImage: "https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449091/TalentBolt/Frame_xhkws2.png",
  //     instituteName: "Google",
  //     degree: "Software Engineer",
  //     duration: "2019 - Present",
  //   },
  //   {
  //     id: 3,
  //     instituteImage: "https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449091/TalentBolt/Frame_xhkws2.png",
  //     instituteName: "Google",
  //     degree: "Software Engineer",
  //     duration: "2019 - Present",
  //   },
  //   {
  //     id: 4,
  //     instituteImage: "https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449091/TalentBolt/Frame_xhkws2.png",
  //     instituteName: "Google",
  //     degree: "Software Engineer",
  //     duration: "2019 - Present",
  //   },
  //   {
  //     id: 5,
  //     instituteImage: "https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449091/TalentBolt/Frame_xhkws2.png",
  //     instituteName: "Google",
  //     degree: "Software Engineer",
  //     duration: "2019 - Present",
  //   },
  // ])

  return (
    <div className="w-full bg-white rounded-[20px] px-[40px] py-[20px] flex flex-col items-end gap-[20px]">
      <div className="flex flex-col gap-[15px] items-start w-full">
        <p className="text-[24px] font-semibold text-[#111111]">Education</p>
        <div className="flex flex-wrap gap-[20px]">
          {userData.education &&
            JSON.parse(userData.education).education.map((item) => (
              <div key={item.id} className="flex items-center gap-[10px]">
                <div>
                  <Image
                    src={`https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449091/TalentBolt/Frame_xhkws2.png`}
                    width={73}
                    height={73}
                    alt="institute image"
                  />
                </div>
                <div className="flex flex-col min-w-[250px]">
                  <p className="text-[18px] font-medium text-[#111111]">
                    {item.instituteName}
                  </p>
                  <p className="text-[14px] text-[#111111]/80">{item.degree}</p>
                  <p className="text-[12px]  text-[#111111]/50">
                    {item.duration}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <button onClick={openModal} className="p-2 rounded-lg bg-[#111111] text-white">
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
        contentLabel="Edit Profile Intro"
      >
        <div className="w-[717px] h-[550px] overflow-y-scroll">
          <div className="border-b border-[#111111]/25 flex items-center justify-start h-[68px] px-[25px]">
            <p className="text-[24px] font-semibold text-[#11111]">
              Edit Education
            </p>
          </div>
          <div className="px-[25px] py-[20px] flex flex-col gap-[30px]">
            {education.map((item, index) => {
              return (
                <EducationOneComponent
                  key={item.id}
                  userData={userData}
                  item={item}
                  index={index}
                  education={education}
                  setEducation={setEducation}
                />
              );
            })}

            {/* Done */}
            <div className="px-[20px]">
              <button
                onClick={handleAdd}
                className="w-full bg-white text-[#B270EE] border-2 border-[#B270EE] rounded-[10px] flex items-center justify-center gap-[7px] text-[20px] font-semibold py-[10px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
          <div className="border-t border-[#111111]/25 flex items-center justify-end h-[68px] px-[25px] pt-[10px]">
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

export default Education;
