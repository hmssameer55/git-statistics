"use client"

import React, { useState } from 'react';
import { useGithub } from '@/store/githubContext';

export default function Search() {

    const { fetchUserInfo, fetchOnlyRepos, searchType, setSearchType, searchQuery,setSearchQuery } = useGithub();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchType === 'users') {
            fetchUserInfo(searchQuery);
        } else if (searchType === 'repos') {
            fetchOnlyRepos(searchQuery);
        }
    };

    return (
        <form className=" mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder={`Search GitHub ${searchType === 'repos' ? 'Repositories' : 'Username'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                    className="flex-1 py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="ml-2 py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="users">Users</option>
                    <option value="repos">Repositories</option>
                </select>
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
