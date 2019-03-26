import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'


class PostSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songName: '',
            artistName: '',
            songInfo: ''
        };

        this.firebase = new Firebase()
    }

    handleSongNameChange = (event) => {
        this.setState({ songName: event.target.value });
    }

    handleArtistNameChange = (event) => {
        this.setState({ artistName: event.target.value });
    }

    handleSongInfoChange = (event) => {
        this.setState({ songInfo: event.target.value });
    }

    handleSubmit = () => {
        if (this.state.songName === '' || this.state.artistName === '' || this.state.songInfo === '') {
            console.log("Missing information for song submit...")
            return;
        }
        console.log(`submitPressed: ${this.state.artistName} - ${this.state.songName}: ${this.state.songInfo}`)
        this.setState({ songName: '' });
        this.setState({ artistName: '' });
        this.setState({ songInfo: '' });

        // Send to Firebase
        this.postToFirebase(777, "yarl", this.state.songName, this.state.artistName, this.state.songInfo)
    }

    postToFirebase(uid, username, songname, artist, info) {
        let date = new Date()
        let timestamp = date.getTime()

        // A post entry.
        var postData = {
            songName: songname,
            artist: artist,
            info: info,
            recorded: timestamp,
            uploaded: timestamp,
            uploader: uid,
            uploaderName: username
        };

        // Get a key for a new Post.
        var newPostKey = this.firebase.db.ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/songs/' + newPostKey] = postData;
        updates['/user-songs/' + uid + '/' + newPostKey] = postData;

        return this.firebase.db.ref().update(updates);
    }

    render() {
        return (
                <div id="submit-song-box">
                    <div>
                        Song Name:
                        <textarea id="song-name-area" value={this.state.songName} onChange={this.handleSongNameChange} />
                    </div>
                    <div>
                        Artist:
                        <textarea id="artist-names-area" value={this.state.artistName} onChange={this.handleArtistNameChange} />
                    </div>
                    <div>
                        Additional Info:
                        <textarea id="song-info-area" value={this.state.songInfo} onChange={this.handleSongInfoChange} />
                    </div>
                    <div id="post-button" onClick={this.handleSubmit}>
                        Firebase Post
                    </div>
                </div>
        );
    }
}

export default PostSong;
