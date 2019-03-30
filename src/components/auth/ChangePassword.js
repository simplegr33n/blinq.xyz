import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'


class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email
        };

        this.firebase = new Firebase()

    }


    handleResetPassword = () => {
        this.firebase.auth.sendPasswordResetEmail(this.state.email)
        alert("Password reset email sent!")
        return;
    }

    render() {

        return (
            <div>
                <h3>Reset Password?</h3>
                <div>
                    <button onClick={this.handleResetPassword} > Confirm Reset Password </button>
                </div>
            </div>
        );
    }
}


export default ChangePassword;
