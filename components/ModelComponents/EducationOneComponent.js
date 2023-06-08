import React, { useEffect, useState } from "react";

const EducationOneComponent = ({
  userData,
  item,
  index,
  setEducation,
  education,
}) => {
  const [instituteName, setInstituteName] = useState(item.instituteName);
  const [degree, setDegree] = useState(item.degree);
  const [duration, setDuration] = useState(item.duration);

  useEffect(() => {
    setDegree(item.degree);
    setInstituteName(item.instituteName);
    setDuration(item.duration);
  }, [education]);

  const handleInstituteName = (e) => {
    e.preventDefault();
    setInstituteName(e.target.value);
    let temp = [...education];
    temp[index].instituteName = e.target.value;
    setEducation(temp);
  };

  const handleDegree = (e) => {
    e.preventDefault();
    setDegree(e.target.value);
    let temp = [...education];
    temp[index].degree = e.target.value;
    setEducation(temp);
  };


  const handleDuration = (e) => {
    e.preventDefault();
    setDuration(e.target.value);
    let temp = [...education];
    temp[index].duration = e.target.value;
    setEducation(temp);
  };

  const handleDelete = () => {
    let temp = [...education];
    console.log(temp.splice(index, 1), temp);
    // temp.splice(index, 1);
    setEducation(temp);
  };

  return (
    <div key={index} className="w-full flex flex-col gap-[20px]">
      <div className="w-full flex items-center justify-between">
        <p className="font-medium">Education {index + 1}</p>
        <svg
          onClick={handleDelete}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-red-500 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      <div className="w-full flex gap-[20px] items-center justify-between">
        <input
          className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
          type="text"
          placeholder="Institute Name"
          value={instituteName}
        onChange={handleInstituteName}
        />
        <input
          className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
          type="text"
          placeholder="Degree"
            value={degree}
            onChange={handleDegree}
        />
      </div>
      <div className="w-full flex gap-[20px] items-center justify-between">
        <input
          className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium placeholder:text-[#111111]/25"
          type="text"
          placeholder="Duration (e.g. 2019 - 2021)"
          value={duration}
          onChange={handleDuration}
        />
      </div>
    </div>
  );
};

export default EducationOneComponent;
