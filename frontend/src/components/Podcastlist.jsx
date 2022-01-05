import {Container, Row, Col, Card, Button }  from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Component} from 'react';
import Pagination from './Pagination';

class Podcastlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            PodcastArray:[1,23,4,2,3,4,5,6,7,8,11,22,33,44,55,66,77,88,99],
            CurrentPage: 1, 
            PodcastsPerPage: 8
        }
        
        this.renderPodCasts = this.renderPodCasts.bind(this);
    }

    async componentDidMount(){
        try{
            const podcasts = await Axios.get("https://localhost:8000/backend/getPodcasts");
            
            this.setState({
                PodcastArray: podcasts
            })
        }catch(err){
            console.log(err);
            
        }
    
    }

    
    pageChange = (pagenum) => this.setState({CurrentPage: pagenum})

    renderPodCasts = () => {

        const LastPodcastIndex = this.state.CurrentPage * this.state.PodcastsPerPage;
        const FirstPodcasttIndex = LastPodcastIndex - this.state.PodcastsPerPage;
        const Podcasts = this.state.PodcastArray.slice(FirstPodcasttIndex, LastPodcastIndex);

        return Podcasts.map((podcast) => (
            
            <Col key={podcast.id}>
                <Card style={{ width: '18rem' }}>
                    
                    <Card.Body>
                        <Card.Title>{podcast.title}</Card.Title>
                        <Card.Text>
                            {podcast.description}
                            {podcast}
                        
                        </Card.Text>
                        <Button variant="primary">Play</Button>
                    </Card.Body>
                </Card>
            </Col>
            
        ))
    }

    render(){
        return(
            <div className="PodcastListMain">
                <Container>
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
