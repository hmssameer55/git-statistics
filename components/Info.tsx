"use client"

import React from "react";
import { useGithub } from "@/store/githubContext";
import { RiGitRepositoryLine, RiUserFollowLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { BsStickies } from "react-icons/bs";


export default function Info({type}) {

    const { githubUser, onlyRepos } = useGithub();
    const { public_repos, followers, following, public_gists } = githubUser;

    const items = [
        {
            id: 1,
            icon: <RiGitRepositoryLine />,
            label: "repos",
            value: public_repos,
        },
        {
            id: 2,
            icon: <FiUsers />,
            label: "followers",
            value: followers,
        },
        {
            id: 3,
            icon: <RiUserFollowLine />,
            label: "following",
            value: following,
        },
        {
            id: 4,
            icon: <BsStickies />,
            label: "gists",
            value: public_gists,
        },
    ];

    return (
        <div className={`${type === "repos" ? "mt-10" : "info_layout"}`}>
        {type === "repos" ? (
            <div
                className="bg-white rounded-lg p-2 shadow-md flex-between w-52"
            >
                <div
                    className={`w-12 h-12 flex-center rounded-full text-black bg-gray-200`}
                >
                    {items[0].icon}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold">{onlyRepos?.total_count}</span>
                    <span className="text-sm">{items[0].label}</span>
                </div>
            </div>
        ) : (
            items.map(({ id, icon, label, value }) => (
                <div
                    key={id}
                    className="bg-white bg-opacity-50 rounded-lg p-2 shadow-md flex-between w-52"
                >
                    <div
                        className={`w-12 h-12 flex-center rounded-full text-white bg-gray-700`}
                    >
                        {icon}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-2xl font-bold">{value}</span>
                        <span className="text-sm">{label}</span>
                    </div>
                </div>
            ))
        )}
    </div>

    );
};


