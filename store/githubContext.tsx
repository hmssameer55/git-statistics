"use client"

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export type GithubContextValue = {
    githubUser: any;
    repos: any;
    onlyRepos: any;
    followers: any;
    requestsCount: number;
    isLoading: boolean;
    error: boolean;
    BASE_URL: string;
    searchType: string;
    searchQuery: string;
    setGithubUser: (value: any) => void;
    setRepos: (value: any) => void;
    setOnlyRepos: (value: any) => void;
    setFollowers: (value: any) => void;
    setRequestsCount: (value: any) => void;
    setIsLoading: (value: any) => void;
    setError: (value: any) => void;
    setSearchType: (value: any) => void;
    setSearchQuery: (value: any) => void;
    fetchUserInfo: (username: string) => void;
    fetchOnlyRepos: (repoName: string) => void;
};

export const GithubContext = createContext<GithubContextValue>(
    {} as GithubContextValue
);

const notify = (errMsg: string) => toast.error(errMsg);


export function GithubProvider({ children }: { children: React.ReactNode }) {

    const [githubUser, setGithubUser] = useState([]);
    const [repos, setRepos] = useState([]);
    const [onlyRepos, setOnlyRepos] = useState([]); 
    const [followers, setFollowers] = useState([]);
    const [requestsCount, setRequestsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const BASE_URL = "https://api.github.com";

    const [searchType, setSearchType] = useState('users');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRequestCount = async () => {
            try {
                const {
                    data: {
                        rate: { remaining },
                    },
                } = await axios.get(`${BASE_URL}/rate_limit`);
                if (remaining === 0) {
                    toggleError(true);
                    notify("Sorry, you've exceeded your hourly rate limit!");
                }
                setRequestsCount(remaining);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserInfo("hmssameer55");
        fetchRequestCount();
    }, []);


    function toggleError(status) {
        setError(status);
    }

    const fetchUserInfo = async (username: string) => {
        setIsLoading(true);
        const { data } = await axios
            .get(`${BASE_URL}/users/${username}`)
            .catch((err) => {
                setIsLoading(false);
                notify("Invalid Username!");
            });
        if (data) {
            setGithubUser(data);
            const { login, followers_url } = data;
            await Promise.allSettled([
                axios.get(`${BASE_URL}/users/${login}/repos?per_page=100`),
                axios.get(`${followers_url}?per_page=100`),
            ])
                .then((results) => {
                    const [repos, followers] = results;
                    if ((repos.status = "fulfilled")) {
                        setRepos(repos.value.data);
                    }
                    if ((followers.status = "fulfilled")) {
                        setFollowers(followers.value.data);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    notify("Something went wrong!");
                });
        } else {
            toggleError(true);
            notify("Invalid Username!");
        }
        setIsLoading(false);
    };

    const fetchOnlyRepos = async (repoName: string) => {
        setIsLoading(true);
        const { data } = await axios
            .get(`${BASE_URL}/search/repositories?q=${repoName}&per_page=100`)
            .catch((err) => {
                setIsLoading(false);
                notify("Invalid Username!");
            });
        if (data) {
            setOnlyRepos(data);
        } else {
            toggleError(true);
            notify("Invalid Username!");
        }
        setIsLoading(false);
    }

    return (
        <GithubContext.Provider
            value={{
                githubUser,
                repos,
                onlyRepos,
                followers,
                requestsCount,
                isLoading,
                error,
                BASE_URL,
                searchType,
                searchQuery,
                setGithubUser,
                setRepos,
                setOnlyRepos,
                setFollowers,
                setRequestsCount,
                setIsLoading,
                setError,
                setSearchType,
                setSearchQuery,
                fetchUserInfo,
                fetchOnlyRepos,
            }}
        >
            {children}
            <Toaster />
        </GithubContext.Provider>
    );

}

export function useGithub() {
    return useContext(GithubContext);
}

