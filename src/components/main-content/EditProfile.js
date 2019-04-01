import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import TESTprofileImage from '../../assets/TESTprofile-image.png'


class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            user: this.props.user
        };

        this.firebase = new Firebase()
    }

    gotoPublicProfile = () => {
        this.props.gotoProfile(this.state.user.uid);
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handleSubmit = () => {
        // TODO
    }

    handleChangePassword = () => {
        this.props.goto("changepw")
    }


    render() {
        return (
            <div id="Profile-Page">
                <div id="Profile-Page-Header">
                    <div id="Profile-Page-Header-Left">
                        <button id="view-public-btn" onClick={this.gotoPublicProfile}>View Public</button>
                        <div>
                            Name: {this.props.user.name}
                        </div>
                        <div>
                            Username: {this.props.user.username}
                        </div>
                        <div>
                            Email: {this.props.user.email}
                        </div>
                        <div>
                            Bio: stuff stuff stuff stuff stuff
                        </div>

                        <button onClick={this.handleChangePassword}>Change Password</button>
                    </div>

                    <div>
                        <img src={TESTprofileImage} className="Profile-Page-img" alt="Profile" />
                    </div>
                </div>
            </div>
        );

    }
}

export default EditProfile;
