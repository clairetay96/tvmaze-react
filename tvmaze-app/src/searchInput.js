import React, { useState, useEffect } from 'react'


function SearchInput({value, onChange, onKeyDown, onClick}){

    //adding 'autocomplete' feature by using hooks to get class component like functionality

    //adding a "state" variable that contains the search items
    const [autocompleteItems, setAcItems] = useState([])

    //useEffect to make API call
    useEffect(()=>{

        //mechanism that will turn off api calls when component is unmounted
        const abortController = new AbortController()
        const signal = abortController.signal

         fetch("http://api.tvmaze.com/search/shows?q=" + value, {signal: signal})
            .then(res => res.json())
            .then(res => {
                let autocompleteHTML = res.map((item, index)=>{
                    return <a href={item.show.url} key={index}><div>{item.show.name}</div></a>
                })
                setAcItems(autocompleteHTML)
            })
            .catch((e)=>{
                //abort controller will throw an error when aborting the fetch request, which will be caught by fetch - must account for this by adding a conditional
                if(!abortController.signal.aborted){
                    let autocompleteHTML = e.message
                    setAcItems([autocompleteHTML])
                }
            })

        //aborts the api call when this component is unmounted
        return ()=>{abortController.abort()}

    })


    return (
        <div className="search-bar">
            <div>
                <input type="text" onChange={onChange} value={value} placeholder="Search shows" onKeyDown={onKeyDown}/>
                {autocompleteItems}
            </div>
            <button value={value} onClick={onClick}>Search</button>
        </div>
        )


}

export default SearchInput