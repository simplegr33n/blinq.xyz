import React, { Component } from 'react';
import '../../styles/main-content.css';

import TESTSongArt from '../../assets/TESTdarkside.jpeg'

class SongListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        console.log(this.props.song.duration)
        console.log("song list item dur:" + this.props.song.duration)
    }

    handlePlay = () => {
        // pass song to SongWall, which will pass on to App
        console.log("SongListItem play: " + this.props.song.songName)
        this.props.setSong(this.props.song);
    }

    handleUploaderClick = () => {
        console.log("SongListItem uploader: " + this.props.song.uploader)
        this.props.setProfile(this.props.song.uploader);
    }

    handleSongNameClick = () => {
        this.props.setSongDetails(this.props.song.id);
    }

    formatMinutesSeconds(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }

    render() {
        return (
            <div className="SongListItem">
                <div>
                    <button className="Song-Item-Play-Btn" onClick={this.handlePlay}>
                        <img src={TESTSongArt} className="songArt" alt="Song Art" />
                        {this.formatMinutesSeconds(this.props.song.duration)} &#9654;
                    </button>
                </div>

                <div className="songListItemRight">
                    <div className="songHeader">
                        <div>
                            <div className="songName">
                                <button onClick={this.handleSongNameClick}>{this.props.song.songName}</button>
                            </div>
                            <div className="artistName">
                                <i>by</i> {" " + this.props.song.artist}
                            </div>
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

                    <button className="songList-Uploader-Btn" onClick={this.handleUploaderClick}>Uploaded by: {this.props.song.uploaderName}</button>

                </div>
            </div>
        );
    }
}

export default SongListItem;
