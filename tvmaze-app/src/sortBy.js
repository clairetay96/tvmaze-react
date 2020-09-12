import React from 'react'

function SortBy({onChange, optionState}){

    return (
        <div>
        <div className="sortby-text">Sort By:</div>
        <select className="sortby-field" onChange={onChange} value={optionState}>
                <option value="score">Match Score</option>
                <option value="name">Show Name</option>
                <option value="status">Status</option>
                <option value="rating">Rating</option>
            </select>
            </div>)

}

export default SortBy