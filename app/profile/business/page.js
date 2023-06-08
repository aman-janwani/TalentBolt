"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Client, Account, Databases, ID, Permission, Role } from "appwrite";
import { Puff } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const RegisterBusiness = () => {
  const router = useRouter();
  const [imgaeURL, setImageURL] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [uploading, setUploading] = useState(false);

  const getSession = async () => {
    try {
      const res = await account.get();
      setCurrentUser(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await database
      .createDocument(
        "646b59b272a61a1153b6",
        "646b59c378966245428a",
        ID.unique(),
        {
          name: name,
          email: currentUser.email,
          userID: currentUser.$id,
          image: imgaeURL,
          bio: bio,
          type: "business",
          createdUserAt: currentUser.$createdAt,
        }
      )
      .then(() => {
        router.push("/profile");
      });
  };

  return (
    <div className="w-screen max-w-screen flex items-center text-[#111111]">
      <div className="w-1/2 bg-gradient-to-br from-[#FFEFFA] to-[#D296F3] px-[60px] py-[15px] h-screen flex-col flex justify-between rounded-r-[100px]">
        <div className="">
          <Image
            src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1684673154/samples/logo_2_1_zmmjq4.svg"
            width={145.56}
            height={30}
            alt="logo"
          />
        </div>
        <div className="">
          <Image
            src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685448948/TalentBolt/undraw_personal_settings_re_i6w4_1_1_nu70o1.svg"
            width={685}
            height={584}
            alt="image"
          />
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[527px] flex flex-col items-center justify-center gap-[35px] px-[20px]">
          <div className="w-full flex flex-col items-center justify-center gap-[10px]">
            <h1 className="font-semibold text-[29px]">
              Personalize Your Company Profile
            </h1>
            <p className="text-[#111111]/80 font-normal text-[13px]">
              Showcase your company&apos;s unique story and attract top talent.
            </p>
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <p className="text-[16px] font-semibold text-[#111111]">
              Company Logo
            </p>
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
                      alt="image"
                      width={118}
                      height={118}
                      className="rounded-full object-cover w-[118px] h-[118px]"
                    />
                  ) : (
                    <Image
                      src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1684927066/samples/Frame_dxis4m.svg"
                      width={118}
                      height={118}
                      alt="image"
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
                  name="img"
                  id="img"
                />
                <button className="w-[102px] h-[38px] bg-[#fff] text-[#111111] border-2 border-[#111111] font-medium rounded-[10px] flex items-center justify-center">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <label htmlFor="name" className="text-[#111111] font-semibold">
              Company name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company Name"
              className="rounded-[10px] py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
            />
          </div>
          <div className="w-full flex flex-col gap-[10px]">
            <label htmlFor="Bio" className="text-[#111111] font-semibold">
              Company Bio
            </label>
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="We are a company that does this and that."
              className="rounded-[10px] py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
            />
          </div>
          <div className="w-full">
            <button onClick={handleSubmit} className="flex justify-center items-center border-2 border-[#111111] bg-[#111111] text-white rounded-[10px] py-[14px] w-full">
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBusiness;
