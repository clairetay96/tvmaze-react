import React from 'react'


function SearchInput({value, onChange, onKeyDown, onClick}){


    return (
        <div className="search-bar">
        <input type="text" onChange={onChange} value={value} placeholder="Search shows" onKeyDown={onKeyDown}/>
        <button value={value} onClick={onClick}>Search</button>
        </div>
        )


}

export default SearchInput