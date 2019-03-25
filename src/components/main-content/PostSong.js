import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'


class PostSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songName: '',
            groupName: '',
            artistNames: '',
            songInfo: ''
        };

        this.firebase = new Firebase()
    }

    handleSongNameChange = (event) => {
        this.setState({ songName: event.target.value });
    }

    handleGroupNameChange = (event) => {
        this.setState({ groupName: event.target.value });
    }

    handleArtistNamesChange = (event) => {
        this.setState({ artistNames: event.target.value });
    }

    handleSongInfoChange = (event) => {
        this.setState({ songInfo: event.target.value });
    }

    handleSubmit = () => {
        console.log("submitPressed: " + this.state.songName)
        this.setState({ songName: '' });
        this.setState({ groupName: '' });
        this.setState({ artistNames: '' });
        this.setState({ songInfo: '' });

        // Send to Firebase
        this.postToFirebase(777, "yarl", this.state.groupName, this.state.songName, this.state.artistNames, this.state.songInfo)
    }

    postToFirebase(uid, username, group, songname, artists, info) {
        let date = new Date()
        let timestamp = date.getTime()

        // A post entry.
        var postData = {
            name: songname,
            group: group,
            artists: artists,
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
            <div>
                <div id="submit-song-box">
                    <div>
                        Song Name:
                        <textarea id="song-name-area" value={this.state.songName} onChange={this.handleSongNameChange} />
                    </div>
                    <div>
                        Group Name:
                        <textarea id="group-name-area" value={this.state.groupName} onChange={this.handleGroupNameChange} />
                    </div>
                    <div>
                        Artists:
                        <textarea id="artist-names-area" value={this.state.artistNames} onChange={this.handleArtistNamesChange} />
                    </div>
                    <div>
                        Additional Info:
                        <textarea id="song-info-area" value={this.state.songInfo} onChange={this.handleSongInfoChange} />
                    </div>
                    <div id="post-button" onClick={this.handleSubmit}>
                        Firebase Post
                    </div>
                </div>
            </div>
        );
    }
}

export default PostSong;
