import React, { Component } from 'react'


class Search extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmitQuery}>
          <input type='text' placeholder='Enter a show name' onChange={this.props.onSearchInput}/>
          <input type='submit' value='Search' />
        </form>
      </div>
    )
  }
}


export default Search
