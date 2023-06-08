import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterMain = () => {
  const router = useRouter();

  const handleBusiness = () => {
    router.push("/profile/business");
  }

  const handleIndividual = () => {
    router.push("/profile/individual");
  }

  return (
    <div className="w-screen max-w-screen flex items-center text-[#111111]">
      <div className="w-1/3 bg-gradient-to-br from-[#FFEFFA] to-[#D296F3] px-[60px] py-[15px] h-screen flex-col flex justify-between rounded-r-[50px]">
        <div className="">
          <Image
            src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1684673154/samples/logo_2_1_zmmjq4.svg"
            width={145.56}
            height={30}
            alt="logo"
          />
        </div>
        <div className="h-full gap-[20px] flex flex-col items-center justify-center">
          <h1 className="text-[27px] font-semibold">
            Unleash your potential with Talent Bolt.
          </h1>
          <p className="text-[#111111]/80 text-[14px]">
            Navigate the job market with ease. Personalized recommendations.
            Seamless applications. Empowering your career growth.
          </p>
        </div>
      </div>
      <div className="w-2/3 flex items-center justify-center">
        <div className="w-[512px] flex flex-col items-center justify-center gap-[42px] p-[20px]">
          <div className="w-full flex flex-col gap-[10px] items-center justify-center">
            <h1 className="font-semibold text-[32px]">
              Personalize Your Profile
            </h1>
            <p className="text-[#111111]/80 font-normal text-[13px]">
              Select your role and unlock opportunities.
            </p>
          </div>
          <div onClick={handleBusiness} className="cursor-pointer w-full flex items-center gap-[20px] p-[15px] rounded-[20px] border-[3px] border-[#111111]/25 hover:border-[#009c4c] duration-300">
            <div className="w-[67px] h-[67px] flex items-center justify-center rounded-[10px] text-white bg-[#009C4C]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[24px] text-[#111111] font-semibold">Business</p>
              <p className="text-[12px] text-[#111111]/80">Post jobs for seekers and startups</p>
            </div>
          </div>
          <div onClick={handleIndividual} className="cursor-pointer w-full flex items-center gap-[20px] p-[15px] rounded-[20px] border-[3px] border-[#111111]/25 hover:border-[#009c4c] duration-300">
            <div className="w-[67px] h-[67px] flex items-center justify-center rounded-[10px] text-white bg-[#009C4C]">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[24px] text-[#111111] font-semibold">Individual</p>
              <p className="text-[12px] text-[#111111]/80">apply for jobs & startups, Post your startup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMain;
