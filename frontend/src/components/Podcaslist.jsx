import {Container, Row, Col, Card, Button }  from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Component} from 'react';


class Podcastlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            PodcastArray:[1,23,4]
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

    
    
    renderPodCasts = () => {
        
        return this.state.PodcastArray.map((podcast) => (
            
            <Col key={podcast.id}>
                <Card style={{ width: '18rem' }}>
                    
                    <Card.Body>
                        <Card.Title>{podcast.title}</Card.Title>
                        <Card.Text>
                            {podcast.description}
                        
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
                </Container>
            </div>  
        );
    }
}

export default Podcastlist;
