import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CgOrganisation } from 'react-icons/cg'
import { FiLink } from 'react-icons/fi'
import { IoLocationOutline } from 'react-icons/io5'

const UserCard = ({ data, username }) => {
    return (
        <>
            <div className="detail user-detail-1 border p-3">
                <div className="d-flex justify-content-between my-3">
                    <div className="">
                        <h2>{data.name ? data.name : username}</h2>
                        {data.name && (
                            <p>
                                <Link
                                    href={`https://github.com/${username}`}
                                    className="text-decoration-none"
                                >
                                    @{username}
                                </Link>
                            </p>
                        )}
                    </div>
                    <div className="mx-2">
                        {data.name && (
                            <Image
                                src={data.avatarUrl}
                                alt={data.name}
                                width={80}
                                height={80}
                            />
                        )}
                    </div>
                </div>
                <p>{data.bio}</p>
                <ul className="list-unstyled">
                    {data.company && (
                        <li>
                            <span className="mx-2">
                                <CgOrganisation />
                            </span>
                            {data.company}
                        </li>
                    )}
                    {data.location && (
                        <li>
                            <span className="mx-2">
                                <IoLocationOutline />
                            </span>
                            {data.location}
                        </li>
                    )}
                    {data.websiteUrl && (
                        <li>
                            <span className="mx-2">
                                <FiLink />
                            </span>
                            <Link
                                href={data.websiteUrl}
                                className="text-decoration-none"
                            >
                                {data.websiteUrl}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default UserCard