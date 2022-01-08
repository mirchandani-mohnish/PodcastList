import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';



export default class SearchBox extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            searchVal: "", 

        }

        this.inputElement = React.createRef();
        
        this.handleSearch = this.handleSearch.bind(this);

    }


    handleSearch = () => {
        this.setState({
            searchVal: this.inputElement.current.value
        })
        
        this.props.searchHandler(this.inputElement.current.value);
        // call the searchhandler for the parent function i.e. Podcastlist.jsx 
    }
    render() {
        return (
            <div>
                <div class="form-outline">
                    <input ref={this.inputElement} type="search" id="form1" class="form-control" value={this.state.searchVal} onChange={this.handleSearch}/>
                    <label class="form-label" for="form1">Search</label>
                </div>
                <button type="button" class="btn btn-primary">
                    Search
                    <i class="fas fa-search"></i>
                </button>
            </div>
        )
    }
}
