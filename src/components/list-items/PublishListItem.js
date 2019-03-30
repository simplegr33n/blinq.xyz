import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js';

import TESTSongArt from '../../assets/TESTdarkside.jpeg';

class PublishListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            song: this.props.song
        };

        this.firebase = new Firebase()
    }

    handlePlay = () => {
        // pass song to Studio fragment, which will pass on to App
        this.props.playSong(this.props.song);
    }

    handlePublishPressed = () => {
        let pubSong = this.props.song;

        console.log("pubstate" + pubSong.published)

        if (pubSong.published === undefined || pubSong.published === null) {
            let date = new Date()
            let timestamp = date.getTime()
            pubSong.published = timestamp;
            this.setState({ song: pubSong });

            console.log("PUB!" + pubSong)

            // Updates the new song's data simultaneously to the user's song list (/usersongs/UID/*), and the published songs list (/songs/*).
            var pub = {};
            pub['/songs/' + pubSong.id] = pubSong; // Add to published songs list
            pub['/user-songs/' + pubSong.uploader + '/' + pubSong.id] = pubSong;

            return this.firebase.db.ref().update(pub);
        } else {
            pubSong.published = null;
            this.setState({ song: pubSong });

            console.log("UNPUB!" + pubSong)

            this.firebase.db.ref().child('songs').child(pubSong.id).remove(); // Remove from published songs list

            var unpub = {};
            unpub['/user-songs/' + pubSong.uploader + '/' + pubSong.id] = pubSong;

            return this.firebase.db.ref().update(unpub);
        }


    }

    render() {
        return (
            <div className="PublishSongListItem">

                <div>
                    <button className="Publish-Song-Play-Btn" onClick={this.handlePlay}>
                        <img src={TESTSongArt} className="PublishSongArt" alt="Song Art" />
                        {this.props.song.songLength} &#9654;
                    </button>
                </div>

                <div className="songListItemRight">
                    <div className="songHeader">
                        <div>
                            <div className="PublishSongName">
                                {this.props.song.songName}
                            </div>
                            <div className="PublishSongArtistName">
                                <i>by</i> {" " + this.props.song.artist}
                            </div>
                        </div>
                        <div className="PublishSongRecordingDate">
                            {new Intl.DateTimeFormat('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(this.props.song.recorded)}
                        </div>
                    </div>
                    <div className="PublishSongInfo">
                        {this.props.song.info}
                    </div>
                </div>
                <div>
                    {(() => {
                        if (this.state.song.published) {
                            return (
                                <button className="PublishSong-unpublish-button" onClick={this.handlePublishPressed}>
                                    🛇<br />
                                    UNPUBLISH
                                </button>
                            );
                        } else {
                            return (
                                <button className="PublishSong-publish-button" onClick={this.handlePublishPressed}>
                                    ✓<br />
                                    PUBLISH
                                </button>
                            );
                        }
                    })()}
                </div>
            </div>
        );
    }
}

export default PublishListItem;
