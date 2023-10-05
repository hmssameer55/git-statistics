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
            color: "#006e1878",
        },
        {
            id: 2,
            icon: <FiUsers />,
            label: "followers",
            value: followers,
            color: "#e7800178",
        },
        {
            id: 3,
            icon: <RiUserFollowLine />,
            label: "following",
            value: following,
            color: "#0008ff78",
        },
        {
            id: 4,
            icon: <BsStickies />,
            label: "gists",
            value: public_gists,
            color: "#ff000078",
        },
    ];

    return (
        <div className={`${type === "repos" ? "mt-10" : "info_layout"}`}>
        {type === "repos" ? (
            <div
                className="bg-white bg-opacity-50 rounded-lg p-2 shadow-md flex justify-between items-center w-52"
            >
                <div
                    className={`bg-${items[0].color} w-9 h-9 flex items-center justify-center rounded-full text-white`}
                >
                    {items[0].icon}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold">{onlyRepos?.total_count}</span>
                    <span className="text-sm">{items[0].label}</span>
                </div>
            </div>
        ) : (
            items.map(({ id, icon, label, color, value }) => (
                <div
                    key={id}
                    className="bg-white bg-opacity-50 rounded-lg p-2 shadow-md flex justify-between items-center w-52"
                >
                    <div
                        className={`bg-${color} w-9 h-9 flex items-center justify-center rounded-full text-white`}
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


