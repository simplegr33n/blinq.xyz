import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };

        this.firebase = new Firebase()
    }

    render() {
        return (
            <div>
                PROFILE PAGE
                <div>
                    Username: {this.props.user.username}
                </div>
            </div>
        );
    }
}

export default Profile;
