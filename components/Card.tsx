"use client"

import React, { Fragment } from 'react'
import { useGithub } from '@/store/githubContext';
import Image from 'next/image';


function Description({ text }) {
    return (
        <p className='about_desc'>
            {text}
        </p>
    )
}

export default function Card() {

    const { githubUser } = useGithub();

    const {
        name,
        company,
        blog,
        bio,
        location,
        twitter_username,
        avatar_url,
        html_url,
    } = githubUser;

    return (
        <div className='user_card mt-10'>
            <div className='user_card_image'>
                <Image
                    src={avatar_url}
                    alt="user image"
                    width={200}
                    height={200}
                    className='user_img'
                />
            </div>
            <div>
                <h3 className='sub_text'>{name}</h3>
                <p className='desc'>
                    {bio}
                </p>
                <div className="flex-start mt-4 gap-2">
                    {[
                        { text: company },
                        { text: location },
                        { text: twitter_username },
                        { text: blog },
                    ].map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {item.text && (
                                    <Description text={item.text} />
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    )

}
