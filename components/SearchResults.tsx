"use client"

import React, { Fragment } from 'react'
import Info from '@/components/Info'
import Card from '@/components/Card'
import Search from '@/components/Search'
import RepoCard from '@/components/RepoCard'
import { useGithub } from '@/store/githubContext'

export default function SearchResults() {

    const { searchType, onlyRepos } = useGithub();

    return (
        <Fragment>
            <Info type={searchType} />
            {searchType === 'users' ? (
                <Card />
            ) : (
                <div className='repo_layout'>
                    {
                        onlyRepos?.items?.map(repo => (
                            <RepoCard key={repo.id} repo={repo} />
                        ))
                    }
                </div>    
            )
            }
        </Fragment>
    )
}
