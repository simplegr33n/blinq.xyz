import React, { Component } from 'react';
import '../../styles/App.css';
import Firebase from '../../config/firebaseConfig.js'


class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email
        };

        this.firebase = new Firebase()

    }

    gotoEditProfile = () => {
        this.props.goto('editprofile');
    }

    handleResetPassword = () => {
        this.firebase.auth.sendPasswordResetEmail(this.state.email)
        alert("Password reset email sent!")
        return;
    }

    render() {

        return (
            <div id="Reset-Password-Div">
                <h3>Reset Password?</h3>
                <button onClick={this.handleResetPassword} > Confirm Reset Password </button>
                <button onClick={this.gotoEditProfile} > Nevermind </button>
            </div>
        );
    }
}


export default ChangePassword;
