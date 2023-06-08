"use client";
import React, { useEffect, useState } from "react";
import { Client, Account, Databases, ID, Permission, Role } from "appwrite";
import Image from "next/image";

const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const LoginMain = () => {

  const handleSignup = () => {
    account.createOAuth2Session(
      "google",
      "http://localhost:3000/profile"
    );
    console.log("done");
  }

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
            src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685448868/TalentBolt/undraw_fingerprint_login_re_t71l_1_rbmgyy.svg"
            width={646}
            height={616}
            alt="image"
          />
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[370px] flex flex-col items-center justify-center gap-[29px] p-[20px]">
          <div className="w-full">
            <h1 className="font-semibold text-[26px]">Login/Create your account</h1>
            <p className="text-[#111111]/80 font-normal text-[13px]">
              Please use google for creating account, Email and password option
              will be available soon.
            </p>
          </div>
          <div className="w-full">
            <button onClick={handleSignup} className="flex justify-center items-center border-2 border-[#111111] rounded-[10px] py-[14px] w-full">
              <span className="text-[20px] font-semibold text-[#4285F4]">
                G
              </span>
              <span className="text-[20px] font-semibold text-[#DB4437]">
                o
              </span>
              <span className="text-[20px] font-semibold text-[#F4B400]">
                o
              </span>
              <span className="text-[20px] font-semibold text-[#4285F4]">
                g
              </span>
              <span className="text-[20px] font-semibold text-[#0F9D58]">
                l
              </span>
              <span className="text-[20px] font-semibold text-[#0F9D58]">
                e
              </span>
            </button>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-[14px] font-semibold text-[#111111]">or</p>
          </div>
          <div className="w-full">
            <input disabled
              type="text"
              placeholder="Email"
              className="rounded-[10px] cursor-not-allowed py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
            />
          </div>
          <div className="w-full">
            <input disabled
              type="password"
              placeholder="Password"
              className="rounded-[10px] cursor-not-allowed py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
            />
          </div>
          <div className="w-full">
            <button disabled className="flex cursor-not-allowed justify-center items-center border-2 border-[#111111] bg-[#111111] text-white rounded-[10px] py-[14px] w-full">
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
