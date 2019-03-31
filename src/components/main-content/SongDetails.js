import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import TESTimage from '../../assets/TESTdarkside.jpeg'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songId: this.props.songId,
            song: null
        };

        this.firebase = new Firebase()
    }

    render() {

        return (
            <div id="Song-Details-Page">
                <div>
                    {this.props.song.songName}
                </div>
                <img src={TESTimage} className="Song-Details-img" alt="Song art" />
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

export default Profile;
