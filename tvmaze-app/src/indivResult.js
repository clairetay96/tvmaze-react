import React from 'react'


function IndivResult({name, image, url, status, rating}){

    return (
            <div className="indiv-result">
                <a href={url}>
                <img src={image} alt="Image unavailable" />
                <div>{name}</div>
                <div className="additional-info"><div>{status}</div><div> {rating}</div></div>
                </a>
            </div>
            )



}

export default IndivResult