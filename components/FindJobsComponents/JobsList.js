import React from "react";
import JobCard from "./JobCard";

const JobsList = ({jobs, setFilters, filters}) => {
  return (
    <div className="flex-1 flex flex-col gap-[15px] pl-[40px]">
      <div className="flex items-center justify-between gap-[33px]">
        {/* Search Bar */}
        <div className="px-[20px] h-[57px] flex-1 flex items-center gap-[15px] rounded-[8px] bg-[#111111]/10 text-[#111111]/50 hover:brightness-90 duration-300">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            className="outline-none border-none bg-transparent w-full focus:brightness-90 text-[#111111]/70 "
            placeholder="Search job title or keywords"
          />
        </div>
        <div>
          <button className="px-[41px] py-[14px] bg-[#111111] text-white rounded-[8px] text-[18px] font-medium">
            Search
          </button>
        </div>
      </div>
      {/* one Job */}
       {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
       ))}
      {/* end */}
    </div>
  );
};

export default JobsList;
