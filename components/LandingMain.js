import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LandingMain = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-[#FFEFFA] to-[#D296F3] flex items-center justify-between px-[60px] h-full">
      <div className="flex-col items-center justify-center text-center text-[#111111]">
        <div>
          <p className="text-[61px] font-semibold font-workSans">
            Unleash Your Potential with{" "}
          </p>
          <p className="text-[61px] font-semibold font-workSans">
            Talent Bolt
          </p>
        </div>
        <button onClick={(e) => {
          Router.push("/profile");
        }} className="mt-[48px] w-[262px] h-[66px] bg-[#111111] text-white rounded-[20px] font-semibold text-[22px]">Get Started</button>
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685443052/TalentBolt/undraw_career_progress_ivdb_1_1_bkclw8.svg"
          width={642}
          height={446}
          alt="image"
        />
      </div>
    </div>
  );
};

export default LandingMain;
