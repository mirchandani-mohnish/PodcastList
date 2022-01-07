import React, { Component } from 'react'
import { Navbar, Container, Nav, NavDropdown,  } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';

export default class MusicPlayerBar extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

    }



    

    render() {
        return (
            <div>
                <Container fluid>
                    

                    <div className="DisplayBox">

                    </div>
                    
                    
                    <div className="ButtonPanel">
                    <AudioPlayer src="https://localhost:3000/temp/TestMusic.mp3" onPlay={() => { console.log("playing")}} />
    
                    </div>
                    
                    
                </Container>
            </div>
        )
    }
}
