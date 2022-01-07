import './App.css';
import Container from 'react-bootstrap/Container';
import { Col, Navbar, Row } from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


// components 
import Podcastlist from './components/Podcastlist';
import MusicPlayerBar from './components/MusicPlayerBar';




function App() {
  return (
    
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <Podcastlist />
          </Col>
          <Col lg={3}>
            <MusicPlayerBar />
          </Col>
        </Row>
      </Container>
      
      {/* <MusicPlayerBar /> */}
    </div>
  );
}

export default App;
