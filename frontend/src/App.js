import './App.css';
import Container from 'react-bootstrap/Container';
import { Col, Navbar, Row } from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

// components 
import Podcastlist from './components/Podcastlist';
import MusicPlayerBar from './components/MusicPlayerBar';




function App() {
  const [currentAudio, setCurrentAudio] = useState();
  

  


  return (
    
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <Podcastlist setCurrentAudio={setCurrentAudio}/>
          </Col>
          <Col lg={3}>
            <MusicPlayerBar audioFile={currentAudio}/>
          </Col>
        </Row>
      </Container>
      
      {/* <MusicPlayerBar /> */}
    </div>
  );
}

export default App;
