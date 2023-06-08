import React, { useState } from "react";
import { Client, Account, Databases, ID } from "appwrite";
import ReactMarkdown from 'react-markdown'


const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const UploadJob = ({ userData }) => {
  const [position, setPosition] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [expLevel, setExpLevel] = useState("");
  const [markdown, setMarkdown] = useState(false);


  const addJobToCompanyData = async (jobId) => {
    const res = await database
      .updateDocument(
        "646b59b272a61a1153b6",
        "646b59c378966245428a",
        userData.$id,
        {
          jobs: [...userData.jobs, jobId],
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if all this are available
    if (
      position &&
      type &&
      salary &&
      location &&
      description &&
      duration &&
      expLevel
    ) {
      const res = await database
        .createDocument(
          "646b59b272a61a1153b6",
          "6478869038fe1d9a4978",
          ID.unique(),
          {
            Position: position,
            company: JSON.stringify(userData),
            salary,
            location,
            type,
            remote,
            duration,
            expLevel,
            description,
          }
        )
        .then((res) => {
          console.log(res);
          addJobToCompanyData(res.$id);
          alert("Job uploaded successfully");
          setDescription("");
          setDuration("");
          setExpLevel("");
          setLocation("");
          setPosition("");
          setRemote("");
          setSalary("");
          setType("");
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="bg-[#111111]/5 flex justify-center h-screen px-[60px] py-[40px]">
      <div className="w-full h-[90%] overflow-y-scroll bg-white p-5 rounded-[20px]">
        <div className="border-b border-[#111111]/25 flex items-center justify-start h-[68px] px-[25px]">
          <p className="text-[24px] font-semibold text-[#11111]">
            Upload a Job
          </p>
        </div>
        <div className="px-[25px] py-[20px] flex flex-col gap-[20px]">
          {/* Inputs */}
          <div className="flex items-center justify-between gap-[30px]">
            <div className="w-full flex flex-col gap-[10px] px-[20px] py-[10px]">
              <label
                htmlFor="position"
                className="text-[#111111] font-semibold"
              >
                Position
              </label>
              <input
                type="text"
                name="position"
                value={position}
                required
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Position"
                className="rounded-[10px] py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
              />
            </div>
            <div className="w-full flex flex-col gap-[10px] px-[20px] py-[10px]">
              <label htmlFor="type" className="text-[#111111] font-semibold">
                Job Type
              </label>
              <select
          onChange={(e) => setType(e.target.value)}
          name=""
          id=""
          value={type}
          className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium"
        >
          <option value="" disabled>
            Select Job Type
          </option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Contract">Temporary</option>
          <option value="Other">Other</option>
        </select>
            </div>
          </div>
          <div className="flex items-center justify-between gap-[30px]">
            <div className="w-full flex flex-col gap-[10px] px-[20px] py-[10px]">
              <label htmlFor="Salary" className="text-[#111111] font-semibold">
                Salary
              </label>
              <input
                type="text"
                name="Salary"
                value={salary}
                required
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
                className="rounded-[10px] py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
              />
            </div>
            <div className="w-full flex flex-col gap-[10px] px-[20px] py-[10px]">
              <label
                htmlFor="Location"
                className="text-[#111111] font-semibold"
              >
                Location
              </label>
              <input
                type="text"
                name="Location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="rounded-[10px] py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-[30px]">
            <div className="w-full flex flex-col gap-[10px] px-[20px] py-[10px]">
              <label
                htmlFor="duration"
                className="text-[#111111] font-semibold"
              >
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={duration}
                required
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration"
                className="rounded-[10px] py-[14px] w-full px-[33px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
              />
            </div>
            <div className="w-full flex flex-col gap-[10px] px-[20px] py-[10px]">
              <label
                htmlFor="expLevel"
                className="text-[#111111] font-semibold"
              >
                Experience Level
              </label>
              <select
          onChange={(e) => setExpLevel(e.target.value)}
          name=""
          id=""
          value={expLevel}
          className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium"
        >
          <option value="" disabled>
            Select Experience Level
          </option>
          <option value="Internship">Entry level</option>
          <option value="Freelance">Mid level</option>
          <option value="Full-time">Senior level</option>
          <option value="Part-time">Associate</option>
          <option value="Contract">Director</option>
          <option value="Executive">Executive</option>
        </select>
            </div>
          </div>
          <div className="flex items-start justify-between gap-[30px]">
            <div className="w-full flex items-center gap-[10px] px-[20px] py-[10px]">
              <label htmlFor="remote" className="text-[#111111] font-semibold">
                Remote
              </label>
              <select
          onChange={(e) => setRemote(e.target.value)}
          name=""
          id=""
          value={remote}
          className="bg-[#111111]/5 w-full h-[59px] outline-none rounded-[10px] px-[12px] text-[#111111]/70 font-medium"
        >
          <option value="" disabled>
            Remote
          </option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">On-site</option>
          <option value="Remote">Remote</option>
        </select>
            </div>
            <div className="w-full flex flex-col gap-[10px] px-[20px] py-[10px]">
              <label
                htmlFor="description"
                className="text-[#111111] flex items-center gap-[10px] font-semibold"
              >
                Description{" "}
                <span onClick={() => {
                  setMarkdown(!markdown)
                }} className="text-[#10002b] cursor-pointer">
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
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
              </label>
              {markdown ? (
                <div className= "prose border-2 border-[#111111]/20 rounded-[20px] min-h-[200px] p-5 ">
                  <ReactMarkdown>
                  {description}
                </ReactMarkdown>
                </div>
              ) : (
                <textarea
                type="text"
                name="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description  (markdown supported)"
                className="rounded-[10px] py-[14px] w-full px-[33px] h-[200px] bg-[#111111]/5 border-none outline-none focus:brightness-75"
              />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-[30px]"></div>
        </div>
        <div className="border-t border-[#111111]/25 flex items-center justify-end h-[68px] px-[25px]">
          <button
            onClick={handleSubmit}
            className="bg-[#5A189A] text-white w-[127px] h-[55px] flex items-center rounded-[15px] justify-center text-[20px] font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadJob;
