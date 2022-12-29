import Link from 'next/link';
import React from 'react'

const PublicRepos = ({data}) => {
    return (
        <>
            <div className="detail user-detail-1 border p-3">
                <div className="mt-3">
                    <h4 className="">Public Repositories </h4>
                </div>
                {data.repositories && (
                    <p className="text-muted">
                        {data.repositories.nodes.length} /{" "}
                        {data.repositories.totalCount}
                    </p>
                )}
                <div className="d-flex justify-content-between">
                    <ul className="list-unstyled">
                        <li></li>
                        {data.repositories &&
                            data.repositories.nodes.map((repo) => {
                                return (
                                    <li key={repo.name}>
                                        <Link
                                            href={repo.url}
                                            className="text-decoration-none fs-6"
                                        >
                                            {repo.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        <li></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default PublicRepos