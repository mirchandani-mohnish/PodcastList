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
            <div className="container m-4">
                <div className="row">
                    <div className="col col-10">
                        <div className="form-outline">
                        <input ref={this.inputElement} type="search" id="form1" className="form-control" defaultValue={this.state.searchVal} onchange={this.handleSearch} />
                        
                        </div>
                    </div>
                    
                
                
                    <div className="col">
                        <button type="button" className="btn btn-primary">
                        Search
                        <i className="fas fa-search" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
