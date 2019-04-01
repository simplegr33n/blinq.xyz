import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import TESTprofileImage from '../../assets/TESTprofile-image.png'

import ProfileSongItem from '../list-items/ProfileSongItem.js' // TODO: make special listitem for Profile page


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            songs: [],
            profileId: this.props.profileId
        };

        this.firebase = new Firebase()
    }

    componentDidMount() {
        this.getUser();
        this.getSongs();
    }

    getUser = () => {
        // Songs branch of tree
        var ref = this.firebase.db.ref().child('users').child(this.props.profileId);

        ref.on("value", (snapshot) => {
            this.setState({
                user: snapshot.val(),
            });
        }, function (errorObject) {
            console.log("User profile get failed: " + errorObject.code);
        });
    }

    handleSetSong = (setValue) => {
        console.log(setValue)
        // set song in App.js
        this.props.setSong(setValue);
    }

    gotoSongDetails = (id) => {
        console.log(id);
        this.props.gotoSongDetails(id)
    }

    getSongs = () => {
        // User's published songs
        var ref = this.firebase.db.ref().child('published-songs').child(this.props.profileId);

        ref.on('child_added', snapshot => {
            const previousSongs = this.state.songs;
            previousSongs.push({
                url: snapshot.val().url,
                songName: snapshot.val().songName,
                artist: snapshot.val().artist,
                recorded: snapshot.val().recorded,
                info: snapshot.val().info,
                uploader: snapshot.val().uploader,
                uploaderName: snapshot.val().uploaderName,
                uploaded: snapshot.val().uploaded,
                published: snapshot.val().published,
                id: snapshot.val().id,
                songLength: '3:33' // Placeholder
            });
            this.setState({
                songs: previousSongs
            });
        });
    }

    render() {
        if (this.state.user !== null) {
            return (
                <div id="Profile-Page">
                    <div id="Profile-Page-Header">
                        <div id="Profile-Page-Header-Left">
                            <div>
                                Name: {this.state.user.name}
                            </div>
                            <div>
                                Username: {this.state.user.username}
                            </div>
                            <div>
                                Email: {this.state.user.email}
                            </div>
                            <div>
                                Bio: stuff stuff stuff stuff stuff
                        </div>
                        </div>

                        <div>
                            <img src={TESTprofileImage} className="Profile-Page-img" alt="Profile" />
                        </div>
                    </div>
                    <div id="Profile-Songs-List">
                        {this.state.songs.reverse().map((song) => (<ProfileSongItem song={song} key={song.id} setSong={this.handleSetSong} setSongDetails={this.gotoSongDetails} />))}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Profile;
