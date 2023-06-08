import Image from "next/image";
import React from "react";
import About from "./profileIndiviual/About";
import Intro from "./profileIndiviual/Intro";
import Exprience from "./profileIndiviual/Exprience";
import Education from "./profileIndiviual/Education";
import Projects from "./profileIndiviual/Projects";
import Skills from "./profileIndiviual/Skills";

const ProfileIndiviual = ({userData}) => {
  return (
    <div className="w-full flex flex-col font-workSans items-center gap-[10px] px-[60px] py-[40px]">
        <Intro userData={userData} />
        <About userData={userData} />
        <Exprience userData={userData} />
        <Education userData={userData} />
        <Projects userData={userData} />
        <Skills userData={userData} />
    </div>
  );
};

export default ProfileIndiviual;
