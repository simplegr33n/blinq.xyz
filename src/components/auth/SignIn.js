import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            SHOWFIELDS: true
        };

        this.firebase = new Firebase();
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    validateEmail(testEmail) {
        var emailRegex = /^\S+@\S+$/;
        return emailRegex.test(String(testEmail).toLowerCase());
    }

    validatePassword(testPswd) {
        var paswdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        return paswdRegex.test(String(testPswd));
    }

    handleLogin = () => {
        this.hideSigninFields();

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

        this.firebase.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                this.props.signIn("songwall");
                return;
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                alert(`${errorCode}: ${errorMessage}`);
                this.showSigninFields();
            });
        
    }

    keyPress = (e) => {
        // handle Enter pressed
        if (e.keyCode === 13) {
            this.handleLogin();
        }
    }

    hideSigninFields = () => {
        this.setState({ SHOWFIELDS: false });
    }

    showSigninFields = () => {
        this.setState({ SHOWFIELDS: true });
    }

    render() {

        if (this.state.SHOWFIELDS) {
            return (
                <div id="signin-div">
                    <h3>Sign In</h3>
                    <div>
                        Email:
                        <input id="signin-username" value={this.state.username} onChange={this.handleUsernameChange} />
                    </div>
                    <div>
                        Password:
                        <input type="password" id="signin-password" onKeyDown={this.keyPress} value={this.state.password} onChange={this.handlePasswordChange} />
                    </div>
                    <div>
                        <button id="submit-signin-btn" onClick={this.handleLogin} > Sign in! </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    One Moment...
                </div>
            );
        }
    }
}


export default SignIn;
