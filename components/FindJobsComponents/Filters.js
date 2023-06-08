import React, { useEffect, useState } from "react";

const Filters = ({ jobs, setFilters, filters }) => {
  const [position, setPosition] = useState([]);
  const [positionFilter, setPositionFilter] = useState([]);

  const fillPosition = () => {
    jobs.forEach((job) => {
      if (!position.includes(job.Position)) {
        setPosition((prev) => [...prev, job.Position]);
      }
    });
    return [...new Set(position)];
  };

  const [location, setLocation] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);

  const fillLocation = () => {
    jobs.forEach((job) => {
      if (!location.includes(job.location)) {
        setLocation((prev) => [...prev, job.location]);
      }
    });
    return [...new Set(location)];
  };

  const [type, setType] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);

  const fillType = () => {
    jobs.forEach((job) => {
      if (!type.includes(job.type)) {
        setType((prev) => [...prev, job.type]);
      }
    });
    return [...new Set(type)];
  };

  fillType();

  const [expLevel, setExpLevel] = useState([]);
  const [expLevelFilter, setExpLevelFilter] = useState([]);

  const fillExpLevel = () => {
    jobs.forEach((job) => {
      if (!expLevel.includes(job.expLevel)) {
        setExpLevel((prev) => [...prev, job.expLevel]);
      }
    });
    return [...new Set(expLevel)];
  }

  fillExpLevel();

  const [remote, setRemote] = useState([]);
  const [remoteFilter, setRemoteFilter] = useState([]);

  const handleApply = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      position: positionFilter.length ? positionFilter : position,
      location: locationFilter.length > 0 ? locationFilter : location,
      type: typeFilter.length > 0 ? typeFilter : type,
      expLevel: expLevelFilter.length > 0 ? expLevelFilter : expLevel,
      remote: remoteFilter.length > 0 ? remoteFilter : remote,
    }));
  };

  return (
    <div className="w-[300px] border border-[#111111]/25 rounded-[20px]">
      <div className="flex items-center w-full justify-between p-[20px] border-b border-[#111111]/25 ">
        <p className="text-[#111111] font-semibold ">Filters</p>
        <p className="text-[#005EF9] font-medium text-[13px]">Clear all</p>
      </div>
      <div>
        <div className="flex flex-col px-[20px] py-[17px] gap-[15px]">
          {/* Job type */}
          <p className="text-[#111111] text-[15px] font-semibold">Job type</p>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Full-time"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!typeFilter.includes(e.target.name)) {
                    setTypeFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setTypeFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Full-time"
              >
                Full-time
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Part-time"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!typeFilter.includes(e.target.name)) {
                    setTypeFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setTypeFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Part-time"
              >
                Part-time
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Internship"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!typeFilter.includes(e.target.name)) {
                    setTypeFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setTypeFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Internship"
              >
                Internship
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Contract"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!typeFilter.includes(e.target.name)) {
                    setTypeFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setTypeFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Contract"
              >
                Contract
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Temporary"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!typeFilter.includes(e.target.name)) {
                    setTypeFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setTypeFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Temporary"
              >
                Temporary
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Other"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!typeFilter.includes(e.target.name)) {
                    setTypeFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setTypeFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label className="text-[15px] text-[#111111]/70" htmlFor="Other">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[20px] py-[17px] gap-[15px]">
          {/* On-site/remote */}
          <p className="text-[#111111] text-[15px] font-semibold">
            On-site/remote
          </p>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Remote"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!remoteFilter.includes(e.target.name)) {
                    setRemoteFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setRemoteFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Remote"
              >
                Remote
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Onsite"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!remoteFilter.includes(e.target.name)) {
                    setRemoteFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setRemoteFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Onsite"
              >
                On-site
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Hybrid"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!remoteFilter.includes(e.target.name)) {
                    setRemoteFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setRemoteFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Hybrid"
              >
                Hybrid
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[20px] py-[17px] gap-[15px]">
          {/* Exprience level */}
          <p className="text-[#111111] text-[15px] font-semibold">
            Experience level
          </p>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Entry level"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!expLevelFilter.includes(e.target.name)) {
                    setExpLevelFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setExpLevelFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Entry level"
              >
                Entry level
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Mid level"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!expLevelFilter.includes(e.target.name)) {
                    setExpLevelFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setExpLevelFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Mid level"
              >
                Mid level
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Senior level"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!expLevelFilter.includes(e.target.name)) {
                    setExpLevelFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setExpLevelFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Senior level"
              >
                Senior level
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Associate"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!expLevelFilter.includes(e.target.name)) {
                    setExpLevelFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setExpLevelFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Associate"
              >
                Associate
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Director"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!expLevelFilter.includes(e.target.name)) {
                    setExpLevelFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setExpLevelFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Director"
              >
                Director
              </label>
            </div>
            <div className="flex items-center gap-[17px]">
              <input
                type="checkbox"
                name="Executive"
                id=""
                className="accent-[#5A189A]"
                onChange={(e) => {
                  if (!expLevelFilter.includes(e.target.name)) {
                    setExpLevelFilter((prev) => [...prev, e.target.name]);
                  } else {
                    setExpLevelFilter((prev) =>
                      prev.filter((item) => item !== e.target.name)
                    );
                  }
                }}
              />
              <label
                className="text-[15px] text-[#111111]/70"
                htmlFor="Executive"
              >
                Executive
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[20px] py-[17px] gap-[15px]">
          {/* Position */}
          <p className="text-[#111111] text-[15px] font-semibold">Position</p>
          {fillPosition().map((pos) => {
            return (
              <div key={pos} className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-[17px]">
                  <input
                    type="checkbox"
                    name={pos}
                    id=""
                    className="accent-[#5A189A]"
                    onChange={(e) => {
                      if (!positionFilter.includes(e.target.name)) {
                        setPositionFilter((prev) => [...prev, e.target.name]);
                      } else {
                        setPositionFilter((prev) =>
                          prev.filter((item) => item !== e.target.name)
                        );
                      }
                    }}
                  />
                  <label
                    className="text-[15px] text-[#111111]/70"
                    htmlFor={pos}
                  >
                    {pos}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col px-[20px] py-[17px] gap-[15px]">
          {/* Location */}
          <p className="text-[#111111] text-[15px] font-semibold">Location</p>
          {fillLocation().map((loc) => {
            return (
              <div key={loc} className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-[17px]">
                  <input
                    type="checkbox"
                    name={loc}
                    id=""
                    className="accent-[#5A189A]"
                    onChange={(e) => {
                      if (!locationFilter.includes(e.target.name)) {
                        setLocationFilter((prev) => [...prev, e.target.name]);
                      } else {
                        setLocationFilter((prev) =>
                          prev.filter((item) => item !== e.target.name)
                        );
                      }
                    }}
                  />
                  <label
                    className="text-[15px] text-[#111111]/70"
                    htmlFor={loc}
                  >
                    {loc}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={handleApply}
        className="border-t border-[#111111]/25 px-[20px] py-[19px] flex justify-end"
      >
        <button className="px-[30px] py-[15px] rounded-[10px] bg-[#5A189A] text-white font-semibold">
          Apply all
        </button>
      </div>
    </div>
  );
};

export default Filters;
