import Image from "next/image";
import React, { useState } from "react";
import Modal from "react-modal";
import { Puff } from "react-loader-spinner";
import { Client, Account, Databases, ID, Permission, Role } from "appwrite";
import { useRouter } from "next/navigation";

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

const Intro = ({ userData }) => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgaeURL, setImageURL] = useState(null);
  const [coverImageURL, setCoverImageURL] = useState(null);
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const [upName, setUpName] = useState(userData?.name);
  const [upBio, setUpBio] = useState(userData?.bio);
  const [upAddress, setUpAddress] = useState(userData?.address);
  const [upPhone, setUpPhone] = useState(userData?.phone);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "lher8wa9");
    data.append("cloud_name", "dfk5jbk5r");
    fetch("https://api.cloudinary.com/v1_1/dfk5jbk5r/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageURL(data.url);
        setUploading(false);
      });
  };

  const handleUploadCoverImage = async (e) => {
    setCoverImageUploading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "lher8wa9");
    data.append("cloud_name", "dfk5jbk5r");
    fetch("https://api.cloudinary.com/v1_1/dfk5jbk5r/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setCoverImageURL(data.url);
        setCoverImageUploading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await database
      .updateDocument(
        "646b59b272a61a1153b6",
        "646b59c378966245428a",
        userData?.$id,
        {
          name: upName,
          bio: upBio,
          address: upAddress,
          phone: upPhone,
          image: imgaeURL || userData?.image,
          coverImage: coverImageURL || userData?.coverImage,
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

  return (
    <div className="w-full relative bg-white rounded-[20px] flex flex-col items-center justify-between h-[350px]">
      <div className="absolute h-[118px] w-[118px] border-2 border-[#111111] bg-[#f2f2f2] rounded-full top-[20%] bottom-1/2 left-[40px] z-20 translate-y-1/2">
        <Image
          src={userData?.image}
          fill={true}
          className="rounded-full object-scale-down"
          alt="image"
        />
      </div>
      <div className="relative w-full h-1/2 ">
        {userData?.coverImage ? (
          <Image
            src={userData?.coverImage}
            className=" rounded-t-[20px] object-cover"
            fill={true}
            alt="image"
          />
        ) : (
          <Image
            src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449254/TalentBolt/Frame_89_1_ypoqiw.png"
            className=" rounded-t-[20px] object-cover"
            fill={true}
            alt="image"
          />
        )}
      </div>
      <div className="z-20 w-full px-[40px] py-[20px] flex items-end justify-between">
        <div className="flex flex-col">
          <p className="text-[24px] font-semibold text-[#111111]">
            {userData?.name}
          </p>
          <p className="text-[16px]  text-[#111111]/80">{userData?.bio}</p>
          <p className="text-[14px] text-[#111111]/50">{userData?.address}</p>
        </div>
        <div>
          <button
            onClick={openModal}
            className="p-2 rounded-lg bg-[#111111] text-white"
          >
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
              Edit Intro
            </p>
          </div>
          <div className="px-[25px] py-[20px] flex flex-col gap-[30px]">
            {/* Profile Pic */}
            <div className="px-[20px] flex items-center justify-between">
              {uploading ? (
                <div className="">
                  <Puff
                    height="50"
                    width="50"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <>
                  {imgaeURL ? (
                    <Image
                      src={imgaeURL}
                      width={118}
                      height={118}
                      alt="profile"
                      className="rounded-full object-cover w-[118px] h-[118px]"
                    />
                  ) : (
                    <Image
                      src={userData?.image}
                      className="rounded-full object-cover w-[118px] h-[118px]"
                      width={118}
                      height={118}
                      alt="profile"
                    />
                  )}
                </>
              )}
              <div className="flex items-center justify-end gap-[15px]">
                <label
                  htmlFor="img"
                  className="w-[159px] h-[38px] bg-[#111111] text-white font-medium rounded-[10px] flex items-center justify-center"
                >
                  Change
                </label>
                <input
                  onChange={handleUpload}
                  type="file"
                  hidden
                  required
                  name="img"
                  id="img"
                />
                <button className="w-[102px] h-[38px] bg-[#fff] text-[#111111] border-2 border-[#111111] font-medium rounded-[10px] flex items-center justify-center">
                  Delete
                </button>
              </div>
            </div>
            {/* Cover Image */}
            <div className="px-[20px] flex items-center justify-between">
              {coverImageUploading ? (
                <div className="">
                  <Puff
                    height="50"
                    width="50"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <>
                  {coverImageURL ? (
                    <Image
                      src={coverImageURL}
                      width={270}
                      height={29}
                      alt="profile"
                      className=" object-cover w-[270px] h-[39px]"
                    />
                  ) : (
                    <Image
                      src={
                        userData?.coverImage ||
                        "https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685449254/TalentBolt/Frame_89_1_ypoqiw.png"
                      }
                      className=" object-cover w-[270px] h-[39px]"
                      width={270}
                      height={39}
                      alt="profile"
                    />
                  )}
                </>
              )}
              <div className="flex items-center justify-end gap-[15px]">
                <label
                  htmlFor="Coverimg"
                  className="w-[159px] h-[38px] bg-[#111111] text-white font-medium rounded-[10px] flex items-center justify-center"
                >
                  Change
                </label>
                <input
                  onChange={handleUploadCoverImage}
                  type="file"
                  hidden
                  required
                  name="Coverimg"
                  id="Coverimg"
                />
                <button className="w-[102px] h-[38px] bg-[#fff] text-[#111111] border-2 border-[#111111] font-medium rounded-[10px] flex items-center justify-center">
                  Delete
                </button>
              </div>
            </div>
            {/* Full Name */}
            <div className="px-[20px]">
              <input
                className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
                type="text"
                placeholder="Full Name"
                value={upName}
                onChange={(e) => setUpName(e.target.value)}
              />
            </div>
            {/* Bio */}
            <div className="px-[20px]">
              <input
                className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
                type="text"
                placeholder="Bio"
                value={upBio}
                onChange={(e) => setUpBio(e.target.value)}
              />
            </div>
            {/* Address */}
            <div className="px-[20px]">
              <input
                className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
                type="text"
                placeholder="Your Address"
                value={upAddress}
                onChange={(e) => setUpAddress(e.target.value)}
              />
            </div>
            {/* Phone */}
            <div className="px-[20px]">
              <input
                className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
                type="text"
                placeholder="Your Phone no."
                value={upPhone}
                onChange={(e) => setUpPhone(e.target.value)}
              />
            </div>
            {/* Done */}
          </div>
          <div className="border-t border-[#111111]/25 flex items-center justify-end h-[68px] px-[25px]">
            <button onClick={handleSubmit} className="bg-[#5A189A] text-white w-[127px] h-[55px] flex items-center rounded-[15px] justify-center text-[20px] font-semibold">
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Intro;
