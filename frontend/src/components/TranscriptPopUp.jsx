import React, { Component } from 'react';

class TranscriptPopUp extends Component {
    constructor(props){
        super(props);
        this.props = props;
        
    }
    render() {
        return (
            <div>
               <a href="" className="btn btn-success" onClick={(e) => {e.preventDefault();this.props.closeButton();}}>Close</a>
            </div>
        );
    }
}

export default TranscriptPopUp;