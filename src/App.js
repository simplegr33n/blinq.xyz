import React, { Component } from 'react';
import './styles/App.css';
import Firebase from './config/firebaseConfig.js'

// Assets
import cornerLogo from './assets/corner-logo.png'

// Auth
import SignIn from './components/auth/SignIn.js'
import SignUp from './components/auth/SignUp.js'

// Main Content
import SongWall from './components/main-content/SongWall.js'
import Studio from './components/main-content/Studio.js'
import RecordSong from './components/main-content/RecordSong.js'
import PostSong from './components/main-content/PostSong.js'
import EditProfile from './components/main-content/EditProfile.js'

// Music Player
import TopBarPlayer from './components/music-player/TopBarPlayer.js'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mainContent: 'signin', // signin, signup, postsong, songwall, studio, editprofile, record, etc.
			UID: null,
			username: '',
			currentSong: null
		};

		this.firebase = new Firebase()
		this.firebase.auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(`UID: ${user.uid}`);
				this.setState({ UID: user.uid });
				this.getUsername();
			}
		});

	}

	getUsername = () => {
		// Users location in tree
		var ref = this.firebase.db.ref().child('users').child(this.state.UID)

		ref.on("value", (snapshot) => {
			this.setState({ username: snapshot.val().username });
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

	}

	handleSignOut = () => {
		this.setState({ UID: null });
		this.firebase.auth.signOut().then(function () {
			// Sign-out successful.
			console.log(`signed out`)
		}).catch(function (error) {
			// An error happened.
			console.log(`Error signing out: ${error}`)
		});
	}

	handleSignIn = () => {
		// set UID, page to SongWall
		this.setState({
			mainContent: 'songwall'
		});
	}

	handleSetSong = (setValue) => {
		console.log("handle dat set song " + setValue.url)

		if (this.state.currentSong !== setValue) {
			this.setState({
				currentSong: setValue
			});
		}
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

	openStudio = () => {
		if (this.state.mainContent !== 'studio') {
			this.setState({ mainContent: 'studio' });
		}
	}

	openRecord = () => {
		if (this.state.mainContent !== 'record') {
			this.setState({ mainContent: 'record' });
		}
	}

	openEditProfile = () => {
		if (this.state.mainContent !== 'editprofile') {
			this.setState({ mainContent: 'editprofile' });
		}
	}


	render() {
		return (
			<div className="App">
				<header className="App-body">
					<div id="App-Inner-Body">
						<div id="App-Header">
							<div className="spacer-240w" />
							{(() => {
								if (this.state.UID) {
									return (
										<TopBarPlayer song={this.state.currentSong}/>
									);
								}
							})()}
						</div>
						<div id="App-Body-Content">
							<div id="Main-Left">
								<button id="Home-Div" onClick={this.openSongWall}>
									<img src={cornerLogo} className="Muslinq-logo" alt="muslinq-logo" />
								</button>
								{(() => {
									if (this.state.UID) {
										return (
											<div id="Main-Left-Menu">
												<div id="Header-Btns">
													<button id="Profile-Btn" onClick={this.openEditProfile}>Profile</button>
													<button id="Logout-Btn" onClick={this.handleSignOut}>Logout</button>
												</div>
												<div id="Search-Div">
													<input id="Search-Input" />
													<button id="Search-Btn" onClick={this.handleSignOut}>
														<div id="mag-glass">
															&#9906;
														</div>
													</button>
												</div>
												<button className="Left-Menu-Btn" onClick={this.openStudio}>Studio</button>
												<button className="Left-Menu-Btn" onClick={this.openSongWall}>Songwall</button>
											</div>
										);
									}
								})()}
							</div>
							<div id="Main-Content">
								{(() => {
									if (this.state.UID) {
										switch (this.state.mainContent) {
											case 'songwall':
												return <SongWall setSong={this.handleSetSong} />;
											case 'studio':
												return <Studio UID={this.state.UID} goto={this.setMainContent} />;
											case 'postsong':
												return <PostSong UID={this.state.UID} username={this.state.username} />;
											case 'record':
												return <RecordSong UID={this.state.UID} username={this.state.username} />;
											case 'editprofile':
												return <EditProfile UID={this.state.UID} username={this.state.username} />;
											default:
												return <SongWall setSong={this.handleSetSong} />;
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
