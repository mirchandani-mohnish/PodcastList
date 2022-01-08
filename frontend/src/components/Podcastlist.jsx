import {Container, Row, Col, Card, Button }  from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Component} from 'react';
import Pagination from './Pagination';
import SearchBox from './SearchBox';



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
            searchTerm: ""
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
    

    
    renderPodCasts = () => {
        // main function to render the podcasts based on selective terms. 
        console.log(this.state.searchTerm);
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
            
            <Col key={podcast._id}>
                <Card style={{ width: '18rem' }}>
                    
                    <Card.Body>
                        <Card.Title>{podcast.title}</Card.Title>
                        <Card.Text>
                            {podcast.description}
                            
                        
                        </Card.Text>
                        <Button variant="primary" onClick={this.props.PlayAudio(podcast.audio_file)}>Play</Button>
                    </Card.Body>
                </Card>
            </Col>
            
        ))
    }

    
    render(){
        return(
            <div className="PodcastListMain">
                <Container>
                    <SearchBox searchHandler={this.getSearchTerm} />
                    <Row>
                        {this.renderPodCasts()}
                        
                        
                    </Row>
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
