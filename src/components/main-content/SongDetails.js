import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import TESTimage from '../../assets/TESTdarkside.jpeg'

class SongDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            song: this.props.song
        };

        this.firebase = new Firebase()
    }

    handlePlay = () => {
        // pass song to SongWall, which will pass on to App
        console.log("SongDetails play: " + this.props.song.songName)
        console.log("aaan..." + this.props.song.id)
        this.props.setSong(this.props.song);
    }

    formatMinutesSeconds(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }

    render() {

        return (
            <div id="Song-Details-Page">
                <div>
                    {this.props.song.songName}
                </div>
                <button className="Details-Play-Btn" onClick={this.handlePlay}>
                    <img src={TESTimage} className="Song-Details-img" alt="Song Art" />
                    <div>
                        {this.formatMinutesSeconds(this.props.song.duration)} &#9654;
                    </div>
                </button>
                <div>
                    {this.props.song.artist}
                </div>
                <div>
                    {this.props.song.info}
                </div>
            </div>
        );

    }
}

export default SongDetails;
