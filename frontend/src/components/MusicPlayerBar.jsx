import React, { Component } from 'react'
import { Navbar, Container, Nav, NavDropdown,  } from 'react-bootstrap';
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import './MusicPlayerBar.css';
export default class MusicPlayerBar extends Component {
    constructor(props){
        super(props);
        this.props = props;
        
        this.state = {
            src: (this.props.AudioFile) ? (this.props.AudioFile) : ("http://www.sousound.com/music/healing/healing_01.mp3"),
            
        }

    }

    

    

    render() {
        console.log("MusicPlayer rerendered")
        
        console.log(this.props);
        console.log(this.state.src);
        return (
            <div>
                <Container fluid className="m-0">
                    <div className="ButtonPanel">
                    <AudioPlayer 
                    className="audioplayer"
                    src={this.props.audioFile} 
                    onPlay={() => { console.log("playing")}}
                    showJumpControls={false}
                    showFilledVolume={true}
                     />
    
                    </div>
                    
                    
                </Container>
            </div>
        )
    }
}
