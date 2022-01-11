import {Container, Row, Col, Card, Button }  from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Component} from 'react';
import Pagination from './Pagination';
import SearchBox from './SearchBox';
import './Podcastlist.css';
import TranscriptPopUp from './TranscriptPopUp';

class Podcastlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            PodcastArray:[
                {
                    "_id": "61d6b39ce45e106468b35067",
                    "title": "Rebekah Aguilar",
                    "description": "Commodo eu fugiat magna amet sint id velit fugiat fugiat pariatur Lorem aliquip enim. Reprehenderit quis est veniam voluptate pariatur veniam veniam commodo id officia. Qui et velit est dolor ullamco.\r\n"
                },
                {
                    "_id": "61d6b39ce78e3f1e8bb1dd10",
                    "title": "Jacobson Swanson",
                    "description": "Incididunt id aute mollit ad esse quis do veniam fugiat cillum. Duis velit quis laborum ullamco elit qui. Ex est exercitation occaecat cillum do nulla officia ea in minim. Ad amet commodo deserunt ipsum occaecat.\r\n"
                }
            
            
            ],
            CurrentPage: 1, 
            PodcastsPerPage: 8,
            searchTerm: "",
            transcriptWindow: false,
            transcript: ""
        }
        
        this.renderPodCasts = this.renderPodCasts.bind(this);
        
    }

    async componentDidMount(){
        try{
            const podcasts = await Axios.get("/getPodcasts");
            console.log(podcasts.data);

            this.setState({
                PodcastArray: podcasts.data
            })
        }catch(err){
            console.log(err);
            
        }
    
    }

    
    pageChange = (pagenum) => this.setState({CurrentPage: pagenum})
    
    getSearchTerm = (searchTerm) => {
        this.setState({
            searchTerm : searchTerm
        })
        // the searchterm setter function
    }
    
    
    openTranscript = (transcript) => {
        this.setState({
            transcriptWindow : true,
            transcript : transcript
        });


    }

    closeTranscript = () => {
        this.setState({
            transcriptWindow : false,
            transcript : ""
        });


    }
    
    renderPodCasts = () => {
        // main function to render the podcasts based on selective terms. 
        
        const PodcastList = this.state.PodcastArray.filter((podcast) => {
            return Object.values(podcast).join("").toLowerCase().includes(this.state.searchTerm.toLowerCase());
            // this line basically combines the entire string of each podcast and then checks whether the search term exists in it.
        });
        // PodcastList is a filtered version of the PodcastArray (in state) 
        
        
        const LastPodcastIndex = this.state.CurrentPage * this.state.PodcastsPerPage;
        const FirstPodcasttIndex = LastPodcastIndex - this.state.PodcastsPerPage;
        // we take the lastindex and firstindex to generate the filtered list for pagination. 
        const Podcasts = this.state.searchTerm !== "" ? (PodcastList.slice(FirstPodcasttIndex, LastPodcastIndex)) : this.state.PodcastArray.slice(FirstPodcasttIndex, LastPodcastIndex);

        
        return Podcasts.map((podcast) => (

            <div className="col-md-4">
                <div className="card text-white card-has-bg click-col m-4 shadow" style={{backgroundImage: 'url(' + podcast.photo + ')'}}>
                    <img className="card-img d-none" src={podcast.photo} alt="Goverment Lorem Ipsum Sit Amet Consectetur dipisi?" />
                    <div className="card-img-overlay d-flex flex-column">
                        <div className="card-body">
                            <h4 className="card-title mt-0 "><a className="text-white" onClick={(e) => {e.preventDefault(); this.props.setCurrentAudio(podcast.audio_file); }}>{podcast.title}</a></h4>
                            <small><i className="far fa-clock" /> </small>
                        </div>
                        <div className="transcript h6"><a className="text-white" onClick={(e) => {e.preventDefault(); this.openTranscript(podcast.transcript); }}>Transcript</a></div>
                        <div className="card-footer">
                            <div className="media">
                                <img className="mr-3 rounded-circle" src={podcast.authorImage} alt="Generic placeholder image" style={{maxWidth: '50px'}} />
                                <div className="media-body">
                                    <h6 className="my-0 text-white d-block">{podcast.author}</h6>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
           
            
        ))
    }

    
    render(){
        return(
            <div className="PodcastListMain">
                <Container>
                    <SearchBox searchHandler={this.getSearchTerm} />
                    {this.state.transcriptWindow === false ? 
                    <Row>{this.renderPodCasts()}</Row> : <TranscriptPopUp transcript={this.state.transcript} closeButton={this.closeTranscript} />
                    }

                    <Pagination 
                    TotalPodcasts={this.state.PodcastArray.length} 
                    PodcastsPerPage={this.state.PodcastsPerPage}
                    pageChange={this.pageChange} />
                </Container>
            </div>  
        );
    }
}

export default Podcastlist;
