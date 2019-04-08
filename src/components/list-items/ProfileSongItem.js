import React, { Component } from 'react';
import '../../styles/main-content.css';

import TESTSongArt from '../../assets/TESTdarkside.jpeg'

class ProfileSongItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePlay = () => {
        // pass song to SongWall, which will pass on to App
        this.props.setSong(this.props.song);
    }

    handleUploaderClick = () => {
        this.props.setProfile(this.props.song.uploader);
    }

    handleSongNameClick = () => {
        this.props.setSongDetails(this.props.song.id);
    }

    render() {
        return (
            <div className="SongListItem">
                <div>
                    <button className="profileItemPlayBtn" onClick={this.handlePlay}>
                        <img src={TESTSongArt} className="profileSongArt" alt="Song Art" />
                        <div className="profilePlayIcon">&#9654;</div> 
                    </button>
                </div>

                <div className="songListItemRight">
                    <div className="profileSongHeader">


                        <button className="profileSongName" onClick={this.handleSongNameClick}>{this.props.song.songName}</button>

                        <div className="artistName">
                            <i>by</i> {" " + this.props.song.artist}
                        </div>

                        <div className="profileItemSongDate">
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

export default ProfileSongItem;
