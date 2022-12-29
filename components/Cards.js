import React from 'react'

const Cards = ({ detailsData }) => {
    return (
        <>
            <div className="detail-container">
                <div className="row">
                    {detailsData.map((detail) => {
                        return (
                            <div className="col-md-3 col-sm-6 col-6 my-1" key={detail.id}>
                                <div className="d-flex border detail h-100 align-items-center">
                                    <div className="icon">
                                        <span className={`icon-${detail.color}`}>
                                            {detail.icon}
                                        </span>
                                    </div>
                                    <div className="detail-content">
                                        <h4>{detail.value}</h4>
                                        <p>{detail.title}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Cards