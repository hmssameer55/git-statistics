"use client"

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export type GithubContextValue = {
    githubUser: any;
    repos: any;
    followers: any;
    requestsCount: number;
    isLoading: boolean;
    error: boolean;
    setGithubUser: (value: any) => void;
    setRepos: (value: any) => void;
    setFollowers: (value: any) => void;
    setRequestsCount: (value: any) => void;
    setIsLoading: (value: any) => void;
    setError: (value: any) => void;
    BASE_URL: string;
    fetchUserInfo: (username: string) => void;
};

export const GithubContext = createContext<GithubContextValue>(
    {} as GithubContextValue
);

const notify = (errMsg: string) => toast.error(errMsg);


export function GithubProvider({ children }: { children: React.ReactNode }) {

    const [githubUser, setGithubUser] = useState([]);
    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [requestsCount, setRequestsCount] = useState(0);
    console.log(requestsCount)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(true);
    const BASE_URL = "https://api.github.com";

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

    const fetchUserInfo = async (username) => {
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


    return (
        <GithubContext.Provider
            value={{
                githubUser,
                repos,
                followers,
                requestsCount,
                isLoading,
                error,
                setGithubUser,
                setRepos,
                setFollowers,
                setRequestsCount,
                setIsLoading,
                setError,
                BASE_URL,
                fetchUserInfo,
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

