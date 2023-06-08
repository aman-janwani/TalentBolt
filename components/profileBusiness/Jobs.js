import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { Client, Databases } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";

const client = new Client();

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const Jobs = ({ userData }) => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  // console.log(userData);

  const FetchAllDetailsOfEachJob = async () => {
    userData.jobs.map(async (item) => {
      const res = await database
        .getDocument("646b59b272a61a1153b6", "6478869038fe1d9a4978", item)
        .then((res) => {
          console.log(res, "res");
          setJobs((prev) => [...prev, res]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    FetchAllDetailsOfEachJob();
  }, [userData]);

  return (
    <div className="w-full bg-white rounded-[20px] px-[40px] py-[20px] flex flex-col items-end gap-[20px]">
      <div className="flex flex-col gap-[15px] items-start w-full">
        <p className="text-[24px] font-semibold text-[#111111]">Job Openings</p>
        <div className="grid grid-cols-3 gap-[30px]  w-full">
          {jobs.map((item) => (
            <div key={item.$id} onClick={(e) => {
              e.preventDefault()
              router.push(`/findjob/${item.$id}`)
            }} className="flex items-center gap-[10px] cursor-pointer">
              <div>
                <Image
                  src={JSON.parse(item.company).image}
                  width={68}
                  height={68}
                  alt="company"
                />
              </div>
              <div className="flex flex-col min-w-[250px]">
                <p className="text-[18px] font-medium text-[#111111]">
                  {item.Position}
                </p>
                <p className="text-[14px] text-[#111111]/80">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
