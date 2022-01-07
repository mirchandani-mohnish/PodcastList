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
                },
                
            
                {
                    "_id": "61d6b39ccd2676412217bde2",
                    "title": "Lilian Austin",
                    "description": "Nulla nostrud elit excepteur ut. Ipsum quis aute magna occaecat ad nulla reprehenderit. Qui in minim dolor eu consequat consequat laborum do. Adipisicing deserunt duis laborum ipsum exercitation voluptate veniam. Ipsum elit proident dolore adipisicing elit commodo occaecat velit amet et.\r\n"
                },
                {
                    "_id": "61d6b39cbbe75f3f00df41e5",
                    "title": "Summer Delgado",
                    "description": "Culpa ipsum aliquip anim dolor commodo ipsum laboris occaecat labore. Eiusmod laborum exercitation dolore sint ea duis incididunt elit cupidatat. Laborum labore ad excepteur excepteur enim exercitation cillum do laboris adipisicing ex aute qui. Nostrud aliquip esse duis aute irure enim ut.\r\n"
                },
                {
                    "_id": "61d6b39c9aefd38d7ca6826a",
                    "title": "Higgins Holloway",
                    "description": "Ullamco ad elit mollit dolor magna minim esse labore est exercitation labore. Est fugiat excepteur magna velit reprehenderit ipsum aliquip esse dolor id et aute. Reprehenderit ipsum magna id enim elit consectetur commodo sit dolore sit aute ex. Do fugiat sit mollit non sunt tempor ullamco dolore amet labore laboris in aliqua labore. Culpa id laborum ea ex qui cupidatat incididunt et adipisicing aliquip aliquip velit minim laborum.\r\n"
                },
                {
                    "_id": "61d6b39caa5d52b4a721f93b",
                    "title": "Logan Duran",
                    "description": "Exercitation minim sunt dolore et duis veniam fugiat nulla velit ullamco aliqua quis. Aute in non voluptate in. Laborum dolore nisi duis eu sit incididunt consequat consequat excepteur anim nostrud non incididunt et.\r\n"
                },
                {
                    "_id": "61d6b39cd50162083007a91a",
                    "title": "Vance Herring",
                    "description": "Amet Lorem aute dolore exercitation sint sunt et do laborum. Ut quis laborum elit eiusmod incididunt. Voluptate laboris cillum irure ex dolore reprehenderit exercitation elit culpa ullamco. Laboris veniam fugiat adipisicing consequat enim aute sint anim veniam. Culpa amet cupidatat amet deserunt. Deserunt magna in do consequat. Culpa nostrud cupidatat sit eu non id magna eu incididunt.\r\n"
                },
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
