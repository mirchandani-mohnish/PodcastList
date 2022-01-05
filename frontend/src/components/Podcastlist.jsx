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
            PodcastArray:[
                
                {
                    "_id": "61d5a6f77e5a25fb4eb27d24",
                    "title": "Mercado Stone",
                    "description": "Irure in qui fugiat non. Ipsum id nostrud mollit ea enim fugiat sunt aute adipisicing. Voluptate commodo quis sint occaecat mollit tempor cupidatat. Commodo laboris ut commodo ex.\r\n"
                },
                {
                    "_id": "61d5a6f707feb2004cbfa47a",
                    "title": "Pansy Hess",
                    "description": "Exercitation ad eu ex et pariatur cupidatat ut do commodo cillum. Sunt esse occaecat excepteur commodo tempor qui. Laborum voluptate aute elit non est qui aliqua sint ex commodo pariatur occaecat velit tempor. Commodo cupidatat id occaecat aliquip voluptate.\r\n"
                },
                {
                    "_id": "61d5a6f7b9ff85f5075f9b40",
                    "title": "Joyce Townsend",
                    "description": "Duis exercitation amet pariatur magna occaecat nostrud ad deserunt pariatur excepteur magna. Officia fugiat laborum ex elit amet cupidatat sunt pariatur dolore eiusmod non do ullamco. Qui fugiat et eiusmod occaecat duis eu cillum sint excepteur ullamco sunt voluptate. Sint deserunt id quis ex dolore cillum ad.\r\n"
                },
                {
                    "_id": "61d5a6f78f38efaa18094c00",
                    "title": "Shelton Hubbard",
                    "description": "Exercitation non est eu commodo labore pariatur adipisicing. Minim tempor occaecat sit amet nisi qui minim Lorem consequat aliqua veniam fugiat ad exercitation. Labore proident culpa officia minim officia excepteur elit labore laboris sunt ex. Exercitation aliquip voluptate labore mollit anim velit occaecat laboris dolor dolore et velit amet. Duis magna quis qui proident ea minim consequat dolore ad laborum in aliquip do laboris. Officia laborum duis eu cupidatat reprehenderit ipsum deserunt dolore mollit.\r\n"
                },
                {
                    "_id": "61d5a6f7058df54d61f15331",
                    "title": "Deann Vasquez",
                    "description": "Esse tempor consequat deserunt in. Cupidatat ipsum voluptate fugiat fugiat fugiat dolor culpa pariatur anim cupidatat. Adipisicing aute dolore excepteur labore elit occaecat consectetur irure. Ut labore et id eu aliquip quis fugiat non sint do.\r\n"
                }
                
            ],
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
            
            <Col key={podcast._id}>
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
