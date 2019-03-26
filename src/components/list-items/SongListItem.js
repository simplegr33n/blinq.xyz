import React, { Component } from 'react';
import '../../styles/song-list-item.css';

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
                    <img src={TESTSongArt} className="songArt" alt="SongArt" />
                    <div className="songLength">
                        {this.props.song.songLength}
                    </div>
                </div>
                
                <div className="songListItemRight">
                    <div className="songHeader">
                        <div className="artistName">
                            {this.props.song.artistName}
                        </div>
                        <div className="songName">
                            {this.props.song.songName}
                        </div>
                        <div className="recordingDate">
                            {new Intl.DateTimeFormat('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(this.props.song.recordingDate)}
                        </div>
                    </div>
                    <div className="songInfo">
                        {this.props.song.songInfo}
                    </div>
                </div>
            </div>
        );
    }
}

export default SongListItem;
