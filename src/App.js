import React, { Component } from 'react';
import './styles/App.css';
import Firebase from './config/firebaseConfig.js'

// Assets
import cornerLogo from './assets/corner-logo.png'

// Auth
import SignIn from './components/auth/SignIn.js'
import SignUp from './components/auth/SignUp.js'

// Main Content
import PostSong from './components/main-content/PostSong.js'
import SongWall from './components/main-content/SongWall.js'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mainContent: 'signin', // signin, signup, postsong, songwall, mysongs, record, etc.
			SIGNEDIN: false,
			UUID: null
		};

		this.firebase = new Firebase()
	}

	handleSignOut = () => {
		this.setState({ SIGNEDIN: false });
		this.firebase.auth.signOut().then(function () {
			// Sign-out successful.
			console.log(`signed out`)
		}).catch(function (error) {
			// An error happened.
			console.log(`Error signing out: ${error}`)
		});
	}

	handleSignIn = () => {
		// set UUID, set signedin
		this.setState({
			SIGNEDIN: true,
			mainContent: 'songwall'
		});
	}

	handleSubmit = () => {
		console.log("submitPressed: " + this.state.songName)

		this.setState({ groupName: '' });
		this.setState({ artistNames: '' });
		this.setState({ songInfo: '' });

		// Send to Firebase
		this.postToFirebase(777, "yarl", this.state.groupName, this.state.songName, this.state.artistNames, this.state.songInfo)
	}

	setMainContent = (setValue) => {
		this.setState({ mainContent: setValue });
	}

	openSongWall = () => {
		if (this.state.mainContent !== 'songwall') {
			this.setState({ mainContent: 'songwall' });
		}
	}

	openPostSong = () => {
		if (this.state.mainContent !== 'postsong') {
			this.setState({ mainContent: 'postsong' });
		}
	}

	openMySongs = () => {
		if (this.state.mainContent !== 'mysongs') {
			this.setState({ mainContent: 'mysongs' });
		}
	}


	render() {
		return (
			<div className="App">
				<header className="App-body">
					<div id="App-Inner-Body">
						<div id="App-Header">
							{(() => {
								if (this.state.SIGNEDIN) {
									return (
										<div id="Header-Btns">
											<button id="Profile-Btn">Profile</button>
											<button id="Logout-Btn" onClick={this.handleSignOut}>Logout</button>
										</div>
									);
								}
							})()}
						</div>
						<div id="App-Body-Content">
							<div id="Main-Left">
								<div id="Home-Div">
									<img src={cornerLogo} className="Muslinq-logo" alt="muslinq-logo" />
								</div>

								{(() => {
									if (this.state.SIGNEDIN) {
										return (
											<div id="Main-Left-Menu">
												<button className="Left-Menu-Btn" onClick={this.openSongWall}>Song Wall</button>
												<button className="Left-Menu-Btn" onClick={this.openMySongs}>My Songs</button>
												<button className="Left-Menu-Btn" onClick={this.openPostSong}>Post Song</button>
											</div>
										);
									}
								})()}


							</div>
							<div id="Main-Content">
								{(() => {
									if (this.state.SIGNEDIN) {
										switch (this.state.mainContent) {
											case 'songwall':
												return <SongWall />;
											case 'postsong':
												return <PostSong />;
											default:
												return <SongWall />;
										}
									} else {
										switch (this.state.mainContent) {
											case 'signin':
												return <SignIn gotoSignUp={this.setMainContent} signIn={this.handleSignIn} />;
											case 'signup':
												return <SignUp gotoSignIn={this.setMainContent} />;
											default:
												return <SignIn gotoSignUp={this.setMainContent} signIn={this.handleSignIn} />;
										}
									}
								})()}
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default App;
