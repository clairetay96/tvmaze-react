import React from 'react'
import SearchInput from './searchInput'
import Results from './results'
import SortBy from './sortBy'

class SearchDiv extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: "",
            query: "",
            sortBy: "score",
            onResultsPage: false
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.onInputButtonClick = this.onInputButtonClick.bind(this)
        this.onInputKeyDown = this.onInputKeyDown.bind(this)
        this.onSortByChange = this.onSortByChange.bind(this)
        this.onBackToSearchClick = this.onBackToSearchClick.bind(this)

    }

    //sets this.state.inputValue to the user input value
    onInputChange(event) {
        let x = event.target.value
        this.setState({inputValue: x})

    }

    //sets the state to what is in the input field
    onInputButtonClick(event) {
        let x=event.target.value
        if(x.length > 0) {
            this.setState({query: x, onResultsPage: true, inputValue: ""}) //query only changes on search submission
        }
    }

    //pressing enter does the same thing as button click
    onInputKeyDown(event) {
        if(event.keyCode===13){
            this.onInputButtonClick(event)
        }
    }

    //when sortby value is changed, the state is set accordingly
    onSortByChange(event) {
        let x = event.target.value
        this.setState({sortBy: x})
    }

    onBackToSearchClick() {
        this.setState({onResultsPage: false})
    }



    render() {
        if(!this.state.onResultsPage){
            return (<div>

                <h1>Search TV shows</h1>

            <SearchInput value={this.state.inputValue} onChange={this.onInputChange} onClick={this.onInputButtonClick} onKeyDown={this.onInputKeyDown}/>

            </div>)

        }

        return (<div>
            <div className="result-page-header">
            <button onClick={this.onBackToSearchClick}>Back To Search</button>
            <SortBy onChange={this.onSortByChange} optionState={this.state.sortBy}/>
            </div>
            <Results query={this.state.query} sortBy={this.state.sortBy} />
            </div>)
    }


}


export default SearchDiv