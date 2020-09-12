import React from 'react'
import IndivResult from './indivResult'


class Results extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            query: "", //user input into the search bar
            result: [], //results returned by API
            resultHTML: [], //HTML elements for results
            sortBy: "score" //sortby value, default is score

        }
    }

    //set state from props passed down from parent
    static getDerivedStateFromProps(nextProps, prevState) {
        return {query: nextProps.query, sortBy: nextProps.sortBy}
    }

    //when state has changed,
    componentDidMount(){
        //only trigger api call if the query is different.
        if(this.props.query){
            fetch("http://api.tvmaze.com/search/shows?q=" + this.state.query)
                .then(res => res.json())
                .then(res => {
                    if(res.length === 0 ){
                        this.setState({resultHTML: "Nothing matches your search."})
                    } else {

                        this.sortFunction(this.state.sortBy, res)
                        let resultHTML = this.generateResultHTML(res)
                        this.setState({result: res, resultHTML: resultHTML})
                    }

                })
        }

    }

    componentDidUpdate(prevProps) {
        //only trigger re-sort if the sortby value has changed
        if(prevProps.sortBy!==this.props.sortBy) {
            this.sortFunction(this.state.sortBy, this.state.result)
            let resultHTML = this.generateResultHTML(this.state.result)
            this.setState({resultHTML: resultHTML}) //triggers a re-render of the page

        }

    }

    //sorts the result array based on different fields in each object depending on the sortby value
    sortFunction(sortField, resultArray) {
        switch(sortField) {
            case "score":
                resultArray.sort((a,b)=>{
                    return (b.score > a.score) ? 1 : -1
                })
                break;
            case "name":
                resultArray.sort((a,b)=>{
                    if(a.show.name===b.show.name){ //if names are the same, sort by score
                        return (b.score > a.score) ? 1:-1
                    }
                    return (a.show.name > b.show.name) ? 1 : -1
                })
                break
            case "status": //sorts statuses by reverse alphabetical order
                resultArray.sort((a,b)=>{
                    if(a.show.status===b.show.status){ //if statuses are the same, sort by score
                        return (b.score > a.score) ? 1 : -1
                    }

                    let statusPriority = {
                        "Running" : 1,
                        "In Development": 2,
                        "To Be Determined": 3,
                        "Ended": 4
                    }

                    let a_statPri = statusPriority[a.show.status]
                    let b_statPri = statusPriority[b.show.status]

                    return (a_statPri < b_statPri) ? -1:1
                })
                break
            case "rating":
                 resultArray.sort((a,b)=>{
                    if(a.show.rating.average===b.show.rating.average){
                        return (b.score > a.score) ? 1:-1
                    }
                    return (b.show.rating.average > a.show.rating.average) ? 1 : -1
                })
                break
            default:
                resultArray.sort((a,b)=>{
                    return (b.score > a.score) ? 1 : -1
                })
        }

    }

    //generates html elements based on the result array
    generateResultHTML(resultArray) {
        return resultArray.map((item, index)=>{

                let showImgURL = item.show.image ? item.show.image.medium : null
                let showName = item.show.name
                let showURL = item.show.url
                let showStatus = item.show.status
                let showRating = item.show.rating.average

                return <IndivResult name={showName} image={showImgURL} url={showURL} status={showStatus} rating={showRating} key={index}/>
            })

    }


    render () {
            console.log(this.state)
            return (
                <div>
                <div className="search-notification">You searched for: {this.state.query}</div>
                <div className="all-results">
                    {this.state.resultHTML}
                </div>
                </div>)
    }



}

export default Results