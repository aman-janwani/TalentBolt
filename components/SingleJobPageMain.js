import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Client, Databases, ID } from "appwrite";
import Loading from "./Loading";
import moment from "moment";
import UsersAppliedCard from "./UsersAppliedCard";

const client = new Client();

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const SingleJobPageMain = ({ userData }) => {
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const [usersApplied, setUsersApplied] = useState([]);
  const [chats, setChats] = useState([]);
  const [isChatAlreadyExists, setIsChatAlreadyExists] = useState(false);
  

  const router = useParams();

  console.log(jobData);

  const ddd = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
`;

  const getApplicants = async (res) => {
    // save all users in an array
    const users = [];
    for (let i = 0; i < res.usersApplied.length; i++) {
      await database
        .getDocument("646b59b272a61a1153b6", "646b59c378966245428a", res.usersApplied[i])
        .then((res) => {
          users.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setUsersApplied(users);
};
    
    console.log(usersApplied, "usersApplied");
    
  const getdata = async () => {
    if (router.id !== undefined) {
      await database
        .getDocument("646b59b272a61a1153b6", "6478869038fe1d9a4978", router.id)
        .then((res) => {
          setJobData(res);
          getApplicants(res);
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          // send to 404 page
          window.location.href = "/404";
        });
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // const usersApplied = {
  //   "usersApplied": [
  //     {
  //       id: "1",
  //     },
  //     {
  //       id: "2",
  //     }
  //   ]
  // }

  // const jobsApplied = [id, id, id]

  const addToJobsApplied = async () => {
    const res = database
      .updateDocument(
        "646b59b272a61a1153b6",
        "646b59c378966245428a",
        userData.$id,
        {
          jobsApplied: [...userData.jobsApplied, router.id],
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleApplyNow = async () => {
    if (userData.type === "individual") {
      const res = database
        .updateDocument(
          "646b59b272a61a1153b6",
          "6478869038fe1d9a4978",
          router.id,
          {
            usersApplied: [...jobData.usersApplied, userData.$id],
          }
        )
        .then((res) => {
          console.log(res);
          addToJobsApplied();
          alert("Applied Successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };

  // const fetchAllChats = async () => {
  //   const res = await database
  //     .listDocuments("646b59b272a61a1153b6", "647f31b63e9c1f6ba567")
  //     .then((res) => {
  //       console.log(res.documents);
  //       setChats(res.documents);
  //       res.documents.map((chat) => {
  //         if (
  //           chat.users.includes(userData.$id) &&
  //           chat.users.includes(jobData.usersApplied[0])
  //         ) {
  //           setIsChatAlreadyExists(true);
  //           console.log("chat already exists");
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   if (jobData !== null, userData !== null) {
  //     fetchAllChats();
  //   }
  // }, [jobData]);

  // const handleCreateChat = async () => {
  //   console.log(isChatAlreadyExists);
  //   if (isChatAlreadyExists) {
  //     console.log("chat already exists");
      
  //     // window.location.href = `/chat/${jobData.usersApplied[0]}`;
  //   } else {
  //     const res = await database
  //       .createDocument(
  //         "646b59b272a61a1153b6",
  //         "647f31b63e9c1f6ba567",
  //         ID.unique(),
  //         {
  //           messages: "",
  //           users: [userData.$id, jobData.usersApplied[0]],
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         window.location.href = `/chat/${res.$id}`;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert(err.message);
  //       });
  //   }
  // };

  if (loading) return <Loading />;

  return (
    <div className="bg-[#111111]/5 flex justify-center h-screen px-[60px] py-[40px]">
      <div className="w-full h-[90%] overflow-y-scroll bg-white p-5 rounded-[20px] flex flex-col gap-[10px]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-[30px]">
            <div className="relative h-[88px] w-[88px] border-2 overflow-hidden border-[#111111]/20 rounded-full">
              <Image
                fill={true}
                className="rounded-[13px] object-contain"
                src={JSON.parse(jobData.company).image}
                alt="logo"
              />
            </div>
            <div className="flex flex-col gap-[8px] ">
              <p className="text-[30px] font-semibold text-[#111111]">
                {jobData.Position}
              </p>
              <div className="flex gap-[18px] items-center">
                <p className="text-[18px] text-[#111111]/80">
                  {JSON.parse(jobData.company).name}
                </p>
                <p className="text-[18px] px-[10px] py-[4px]  rounded-full bg-[#5A189A]/25 text-[#5A189A]">
                  {jobData.type}
                </p>
              </div>
            </div>
          </div>
          <div className="px-[25px] py-[5px] flex flex-col items-end gap-[10px]">
            <div className="flex items-center gap-[8px]">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <p className="text-[18px] font-medium text-[#111111]">
                {jobData.location}
              </p>
            </div>
            <p className="text-[16px] text-[#111111]/50">
              Posted {moment(jobData.$createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[15px] py-[20px]">
          {jobData.remote === "Remote" || jobData.remote === "Hybrid" ? (
            <div className="flex items-center gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-[26px] h-[26px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <p className="text-[18px] text-[#111111]/80">Remote work Ava</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex items-center gap-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-[26px] h-[26px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </svg>

            <p className="text-[18px] text-[#111111]/80">{jobData.expLevel}</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-[26px] h-[26px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>

            <p className="text-[18px] text-[#111111]/80">{jobData.salary}</p>
          </div>
          <div className="flex items-center gap-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-[26px] h-[26px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className="text-[18px] text-[#111111]/80">{jobData.duration}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[35px] py-[20px]">
          <p className="text-[23px] font-semibold text-[#111111]">
            About the job
          </p>
          <div className="prose w-full">
            <ReactMarkdown>{jobData.description}</ReactMarkdown>
          </div>
        </div>
        {userData.type === "business" ? (
          <div className="flex flex-col gap-[35px] py-[20px]">
            <p className="text-[23px] font-semibold text-[#111111]">
              Users Applied
            </p>
            <div className="grid grid-cols-3 gap-[20px] w-full">
              {usersApplied.map((user) => (
                <UsersAppliedCard key={user.$id} user={user} userData={userData} jobData={jobData}  />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {userData.type === "individual" ? (
          <>
            {userData.jobsApplied.includes(router.id) ? (
              <div className="flex items-start py-[20px]">
                <button className="flex items-center px-[30px] py-[15px] bg-[#111111] text-white text-[20px] font-medium rounded-[15px]">
                  Applied
                </button>
              </div>
            ) : (
              <div className="flex items-start py-[20px]">
                <button
                  onClick={handleApplyNow}
                  className="flex items-center px-[30px] py-[15px] bg-[#111111] text-white text-[20px] font-medium rounded-[15px]"
                >
                  Apply Now
                </button>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SingleJobPageMain;
