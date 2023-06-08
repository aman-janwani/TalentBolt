import React, { useEffect, useState } from "react";
import { Client, Account, Databases, ID, Query } from "appwrite";
import ReactMarkdown from "react-markdown";
import Banner from "./Banner";
import Link from "next/link";
import Filters from "./Filters";
import Jobs from "../profileBusiness/Jobs";
import JobsList from "./JobsList";

const client = new Client();

const account = new Account(client);

const database = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("646a066dbdcfe4429af9");

const FindJobsMain = ({ userData }) => {
  const [jobs, setJobs] = useState([]);

  const [filters, setFilters] = useState({
    position: [],
    location: [],
    type: [],
    // company: [],
    expLevel: [],
    remote: [],
  });

  const fillFilters = (res) => {
    res.forEach((job) => {
      if (!filters.position.includes(job.Position)) {
        setFilters((prev) => ({
          ...prev,
          position: [...prev.position, job.Position],
        }));
      }
      if (!filters.location.includes(job.location)) {
        setFilters((prev) => ({
          ...prev,
          location: [...prev.location, job.location],
        }));
      }
      if (!filters.type.includes(job.type)) {
        setFilters((prev) => ({
          ...prev,
          type: [...prev.type, job.type],
        }));
      }
      if (!filters.expLevel.includes(job.expLevel)) {
        setFilters((prev) => ({
          ...prev,
          expLevel: [...prev.expLevel, job.expLevel],
        }));
      }
      if (!filters.remote.includes(job.remote)) {
        setFilters((prev) => ({
          ...prev,
          remote: [...prev.remote, job.remote],
        }));
      }
    });
  };

  const getJobs = async () => {
    const res = await database
      .listDocuments("646b59b272a61a1153b6", "6478869038fe1d9a4978")
      .then((res) => {
        setJobs(res.documents);
        console.log(res.documents);
        fillFilters(res.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getJobsByFilters = async () => {
    if (
      filters.position.length > 0 &&
      filters.location.length > 0 &&
      filters.type.length > 0 &&
      filters.expLevel.length > 0
    ) {
      console.log("filters", filters);
      const res = await database
        .listDocuments("646b59b272a61a1153b6", "6478869038fe1d9a4978", [
          Query.equal("Position", filters.position),
          Query.equal("location", filters.location),
          Query.equal("type", filters.type),
          Query.equal("expLevel", filters.expLevel),
          Query.equal("remote", filters.remote),
        ])
        .then((res) => {
          setJobs(res.documents);
          console.log(res.documents);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    getJobsByFilters();
  }, [filters]);

  return (
    <div>
      <Banner />
      <div className="px-[60px] py-[40px] flex items-start">
        <Filters jobs={jobs} setFilters={setFilters} filters={filters} />
        <JobsList jobs={jobs} setFilters={setFilters} filters={filters} />
      </div>
    </div>
  );
};

export default FindJobsMain;
