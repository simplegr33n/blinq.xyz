import React, { Component } from 'react';
import '../../styles/main-content.css';

import TESTSongArt from '../../assets/TESTdarkside.jpeg'

class SongListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    
    render() {
        return (
            <div className="SongListItem">
                <div>
                    <img src={TESTSongArt} className="songArt" alt="Song Art" />
                    <div className="songLength">
                        {this.props.song.songLength}
                    </div>
                </div>
                
                <div className="songListItemRight">
                    <div className="songHeader">
                        <div className="artistName">
                            {this.props.song.artist}
                        </div>
                        <div className="songName">
                            {this.props.song.songName}
                        </div>
                        <div className="recordingDate">
                            {new Intl.DateTimeFormat('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(this.props.song.recorded)}
                        </div>
                    </div>
                    <div className="songInfo">
                        {this.props.song.info}
                    </div>
                </div>
            </div>
        );
    }
}

export default SongListItem;
