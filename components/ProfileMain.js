import React from "react";
import NavBar from "./NavBar";
import Image from "next/image";
import ProfileIndiviual from "./ProfileIndiviual";
import ProfileBusiness from "./ProfileBusiness";

const ProfileMain = ({userData}) => {
  console.log(userData, "userData");
  return (
    <div className="bg-[#111111]/5 min-h-screen">
      <NavBar userData={userData} />
      {/* <ProfileIndiviual /> */}
      {/* <ProfileBusiness /> */}
      {userData.type === "individual" ? (
        <ProfileIndiviual userData={userData} />
      ) : (
        <ProfileBusiness userData={userData} />
      )}
    </div>
  );
};

export default ProfileMain;
