import moment from "moment/moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";


const JobCard = ({key, job}) => {
  const router = useRouter();
  const ddd = `__Advertisement :)__- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image  resize in browser.- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly  i18n with plurals support and easy syntax.You will like those projects!---# h1 Heading 8-)## h2 Heading### h3 Heading#### h4 Heading##### h5 Heading`;

  function removeMarkdownSyntax(string) {
    // Remove Markdown headings (lines starting with one or more `#` characters)
    string = string.replace(/^#+\s+/gm, '');
  
    // Remove horizontal rules (lines consisting of three or more `-`, `_`, or `*` characters)
    string = string.replace(/^[-_*]{3,}\s*$/gm, '');
  
    // Remove code blocks (enclosed between triple backticks)
    string = string.replace(/```[\s\S]*?```/g, '');
  
    // Remove emphasis characters (*, _, ~)
    string = string.replace(/[*_~]/g, '');
  
    // Remove links and images (e.g., [link](url), ![alt text](url))
    string = string.replace(/\[.*?\]\(.*?\)/g, '');
  
    // Remove footnotes (e.g., [^footnote])
    string = string.replace(/\[\^.*?\]/g, '');
  
    // Remove custom containers (e.g., ::: container)
    string = string.replace(/:::.*?$/gm, '');
  
    // Remove abbreviations (e.g., *[abbreviation]: definition)
    string = string.replace(/\*?\[.*?\]:.*$/gm, '');
  
    // Remove other Markdown syntax elements (e.g., > blockquotes, lists, tables, etc.)
    string = string.replace(/[>+-]\s+/g, '');
  
    return string.trim();
  }

  const [company, setCompany] = useState(JSON.parse(job.company));


  
  return (
    <div onClick={(e) => {
      e.preventDefault()
      router.push(`/findjob/${job.$id}`)
    }} key={job.$id} className="border-2 cursor-pointer hover:shadow-md duration-300 border-[#111111]/8 rounded-[20px] flex flex-col gap-[10px] py-[15px]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[20px] px-[25px] py-[5px]">
          <div className="relative h-[66px] w-[66px]">
            <Image
              fill={true}
              className="rounded-[13px] object-contain"
              src={company.image}
              alt="company image"
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="text-[24px] font-semibold text-[#111111]">
              {job.Position}
            </p>
            <div className="flex gap-[18px] items-center">
              <p className="text-[15px] text-[#111111]/80">{company.name}</p>
              <p className="text-[15px] px-[7px] py-[4px]  rounded-full bg-[#5A189A]/25 text-[#5A189A]">
                {job.type}
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
            <p className="text-[15px] font-medium text-[#111111]">{job.location}</p>
          </div>
          <p className="text-[14px] text-[#111111]/50">Posted {moment(job.$createdAt).fromNow()}</p>
        </div>
      </div>
      <div className="px-[25px] text-[#111111]/80 max-w-4xl text-[15px]">
        {removeMarkdownSyntax(job.description)}
      </div>
    </div>
  );
};

export default JobCard;
