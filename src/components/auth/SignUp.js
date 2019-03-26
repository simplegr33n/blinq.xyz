import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.firebase = new Firebase()
    }

    validateEmail(testEmail) {
        var emailRegex = /^\S+@\S+$/;
        return emailRegex.test(String(testEmail).toLowerCase());
    }

    validatePassword(testPswd) {
        var paswdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        return paswdRegex.test(String(testPswd));
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = () => {
        let username = this.state.username;
        let password = this.state.password;
        console.log(`SignUp submit pressed - username ${username}`);
        if (!this.validateEmail(username)) {
            alert('Bad email me thinks :(')
            return;
        }
        if (!this.validatePassword(password)) {
            alert('Bad password. Must be 7-15 characters with at least 1 numeric digit and a special character.')
            return;
        }
        this.setState({
            username: '',
            password: ''
        });

        this.firebase.auth.createUserWithEmailAndPassword(username, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(`${errorCode}: ${errorMessage}`)
            return;
            // ...
        });

        console.log(`username ${username}`)
        this.handleGotoSignIn();
        return;
    }

    handleGotoSignIn = () => {
        this.props.gotoSignIn("signin");
        console.log("Goto signin pressed");
    }

    render() {
        return (
            <div>
                Sign Up
                <div>
                    Username (email):
                    <input id="signup-username" value={this.state.username} onChange={this.handleUsernameChange} />
                </div>
                <div>
                    Password:
                    <input type="password" id="signup-password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>
                <div>
                    <button id="submit-signup-btn" onClick={this.handleSubmit} > Sign up! </button>
                </div>
                <div>
                    <button id="goto-signin-btn" onClick={this.handleGotoSignIn} > Sign in! </button>
                </div>
            </div>
        );
    }
}

export default SignUp;
