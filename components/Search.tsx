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
        <form className="mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white" onSubmit={handleSubmit}>
            <div className='flex-col-row'>
                <input
                    type="text"
                    placeholder={`Search GitHub ${searchType === 'repos' ? 'Repositories' : 'Username'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                    className='search_input'
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className='type_select'
                >
                    <option value="users">Users</option>
                    <option value="repos">Repositories</option>
                </select>
                <button
                    type="submit"
                    className='btn_primary'
                >
                    Search
                </button>
            </div>
        </form>
    );
}
