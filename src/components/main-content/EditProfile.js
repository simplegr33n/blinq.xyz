import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'


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
        // TODO
        this.props.goto("changepw")
    }


    render() {
        return (
            <div>
                <button id="view-public-btn" onClick={this.gotoPublicProfile}>
                    View Public
                </button>
                <div>
                    Edit Username:
                        <input id="edit-username-area" value={this.props.user.username} onChange={this.handleUsernameChange} />
                </div>
                <div>
                    <button onClick={this.handleChangePassword}>Change Password</button>
                </div>
                <button id="post-button" onClick={this.handleSubmit}>
                    Submit Changes
                </button>
            </div>
        );
    }
}

export default EditProfile;
