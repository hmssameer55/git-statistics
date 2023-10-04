"use client"

import React, { useState } from 'react'
import { useGithub } from '@/store/githubContext';

export default function Search() {

    const [username, setUsername] = useState("");

    const { fetchUserInfo } = useGithub();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUserInfo(username);
    };

    return (
        <form className="relative w-96 flex-center mt-10 sm:px-6 px-16" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search Github Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="search_input peer"
            />
        </form>
    )
}
