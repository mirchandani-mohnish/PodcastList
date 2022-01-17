import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



class TranscriptPopUp extends Component {
    constructor(props){
        super(props);
        this.props = props;
        
    }

    
    render() {
        return (
            <div>
                 <div className="jumbotron">
                    <h1 className="display-4">Title</h1>
                    
                    <hr className="my-4" />
                    <p>
                        {
                            (this.props.transcript) ? 
                        
                            (<div dangerouslySetInnerHTML={{__html: this.props.transcript}}></div>)
                            :
                            (<div>Sorry, The transcript is under review and will be out shortly</div>)
                        }
                    </p>
                    <p className="lead">
                    
                    </p>
                </div>
               <a href="" className="btn btn-success" onClick={(e) => {e.preventDefault();this.props.closeButton();}}>Close</a>
            </div>
        );
    }
}

export default TranscriptPopUp;