import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="px-[60px] bg-gradient-to-r from-[#FFEFFA] to-[#D296F3]  w-full h-[302px] flex items-center justify-between">
      <div className="flex flex-col gap-[20px]">
        <p className="text-[48px] text-[#111111] font-semibold">Unleash Your Potential</p>
        <p className="text-[14px] text-[#111111]/80">Explore a world of possibilities. Find the job that ignites your passion and propels your career forward.</p>
      </div>
      <div className="relative w-[316px] h-[280px]">
        <Image
          src="https://res.cloudinary.com/dfk5jbk5r/image/upload/v1685706872/TalentBolt/undraw_note_list_re_r4u9_1_hvbyri.svg"
          fill={true}
          alt="image"
        />
      </div>
    </div>
  );
};

export default Banner;
