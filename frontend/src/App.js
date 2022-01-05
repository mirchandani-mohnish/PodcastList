import './App.css';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Podcastlist from './components/Podcaslist';

function App() {
  return (
    
    <div className="App">
      <Container>
        <Podcastlist />
      </Container>
    </div>
  );
}

export default App;
