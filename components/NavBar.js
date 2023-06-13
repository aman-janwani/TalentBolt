import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = ({ userData }) => {
  
  return (
    <div className="bg-gradient-to-r from-[#FFEFFA] to-[#D296F3] flex items-center justify-between px-[60px] py-[15px]">
      <div>
        <Image
          src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1684673154/samples/logo_2_1_zmmjq4.svg"
          width={145.56}
          height={30}
          alt="logo"
        />
      </div>
      <div className="flex items-center gap-[24px]">
        {userData && userData.type === "individual" ? (
          <Link href="/findjob">
            <p>Find Jobs</p>
          </Link>
        ) : (
          ""
        )}
        {/* <Link href="/findtalent">
          <p>Startup</p>
        </Link> */}
        {userData && userData.type === "business" ? (
          <Link href="/uploadjob">
            <p>Upload Job</p>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center gap-[20px]">
        <Link href="/chat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-[25px] h-[25px] text-[#111111]/80"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </Link>
        <Link href="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-[34px] h-[34px] text-[#111111]/80"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
