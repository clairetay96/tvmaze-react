import React from 'react'

function SortBy({onChange, optionState}){

    return <select className="sortby-field" onChange={onChange} value={optionState}>
                <option value="score">Match Score</option>
                <option value="name">Show Name</option>
                <option value="status">Status</option>
                <option value="rating">Rating</option>
            </select>

}

export default SortBy