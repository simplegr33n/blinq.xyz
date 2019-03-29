import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js';

import TESTSongArt from '../../assets/TESTdarkside.jpeg';

class PublishListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.firebase = new Firebase()
    }

    handlePublishPressed = () => {
        let pubSong = this.props.song;

        console.log("pubstate" + pubSong.published)

        if (pubSong.published === undefined || pubSong.published === null) {
            let date = new Date()
            let timestamp = date.getTime()
            pubSong.published = timestamp;

            console.log("PUB!" + pubSong)

            // Updates the new song's data simultaneously to the user's song list (/usersongs/UID/*), and the published songs list (/songs/*).
            var pub = {};
            pub['/songs/' + pubSong.id] = pubSong; // Add to published songs list
            pub['/user-songs/' + pubSong.uploader + '/' + pubSong.id] = pubSong;

            return this.firebase.db.ref().update(pub);
        } else {
            pubSong.published = null;

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
            
                    <img src={TESTSongArt} className="PublishSongArt" alt="Song Art" />
          
                <div className="songListItemRight">
                    <div className="songHeader">
                        <div className="PublishSongArtistName">
                            {this.props.song.artist}
                        </div>
                        <div className="PublishSongName">
                            {this.props.song.songName}
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
                    <div className="PublishSongLength">
                        {this.props.song.songLength}
                    </div>
                </div>
                <div>
                    {(() => {
								if (this.props.song.published) {
									return (
										<button className="PublishSong-publish-button" onClick={this.handlePublishPressed}>UNPUBLISH</button>
									);
								} else {
                                    return (
										<button className="PublishSong-publish-button" onClick={this.handlePublishPressed}>PUBLISH</button>
									);
                                }
							})()}
                </div>
            </div>
        );
    }
}

export default PublishListItem;