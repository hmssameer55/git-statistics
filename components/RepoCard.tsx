import React from 'react';
import { RiStarFill, RiUserFollowLine } from 'react-icons/ri';
import { FiUsers, FiLink } from 'react-icons/fi';
import { BsStickies } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

export default function RepoCard({ repo }) {
  const { name, description, html_url, stargazers_count, forks, watchers, open_issues, language, owner } = repo;

  const { avatar_url, login } = owner;


  const items = [
    {
      id: 1,
      icon: <RiStarFill />,
      label: "stars",
      value: stargazers_count,
    },
    {
      id: 2,
      icon: <FiUsers />,
      label: "forks",
      value: forks,
    },
    {
      id: 3,
      icon: <RiUserFollowLine />,
      label: "watchers",
      value: watchers,
    },
    {
      id: 4,
      icon: <BsStickies />,
      label: "issues",
      value: open_issues,
    }
  ]


  return (
    <div className="repo_card">
      <div className="flex items-center">
        <div className="flex items-start space-x-4">
        <Image
          src={avatar_url}
          alt={login}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
        </div>

        <div className="ml-auto mb-auto">
          <Link href={html_url} target='_blank'>
              <FiLink className="mt-1"/>
          </Link>
          
        </div>

      </div>
      <div className="mt-3 flex justify-between gap-1.5">
        {
          items.map(({ id, icon, label, value }) => (
            <div
              key={id}
              className="bg-white bg-opacity-50 rounded-lg p-2 shadow-md flex flex-col justify-between items-center w-20"
            >
              <div
                className={`bg-gray-500 w-5 h-5 flex items-center justify-center rounded-full text-white`}
              >
                {icon}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-md font-bold">{value}</span>
                <span className="text-sm">{label}</span>
              </div>
            </div>
          ))
        }
        {/* <div className="bg-white bg-opacity-50 rounded-lg p-2 shadow-md flex justify-between items-center">
          <div
            className={`bg-gray-500 w-7 h-7 flex items-center justify-center rounded-full text-white`}
          >
            <FiUsers />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold">{language}</span>
            <span className="text-sm">language</span>
          </div>
      </div> */}
    </div>
    </div>
  )
}
