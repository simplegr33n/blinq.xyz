import React, { Component } from 'react';
import './styles/App.css';
import Firebase from './config/firebaseConfig.js'

// Assets
import cornerLogo from './assets/corner-logo.png'

// Auth
import SignIn from './components/auth/SignIn.js'
import SignUp from './components/auth/SignUp.js'
import ChangePassword from './components/auth/ChangePassword.js'

// Main Content
import SongWall from './components/main-content/SongWall.js'
import Studio from './components/main-content/Studio.js'
import RecordSong from './components/main-content/RecordSong.js'
import PostSong from './components/main-content/PostSong.js'
import EditProfile from './components/main-content/EditProfile.js'
import Profile from './components/main-content/Profile.js'

// Music Player
import TopBarPlayer from './components/music-player/TopBarPlayer.js'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mainContent: 'signin', // signin, signup, postsong, songwall, studio, profile, editprofile, changepw, record, etc.
			UID: null,
			username: '',
			currentSong: null, // for playing... TODO://also need something for songpage viewing
			viewProfile: null // set to ID of profile you want to view
		};

		this.firebase = new Firebase()
		this.firebase.auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(`UID: ${user.uid}`);
				this.setState({ 
					UID: user.uid,
					email: user.email 
				});
				this.getUsername();
			}
		});

	}

	getUsername = () => {
		// Get user's Username from database
		var ref = this.firebase.db.ref().child('users').child(this.state.UID)

		ref.on("value", (snapshot) => {
			this.setState({
				user: snapshot.val(),
				username: snapshot.val().username // probably just need to set user in state
			});
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
		console.log("handle setsong: " + setValue)
		if (this.state.currentSong !== null && setValue.url !== this.state.currentSong.url) {
			this.setState({
				currentSong: setValue
			});
		} else if (this.state.currentSong == null) {
			this.setState({
				currentSong: setValue
			});
		}
	}

	setMainContent = (setValue) => {
		this.setState({ mainContent: setValue });
	}

	handleSearch = () => {
		alert("App.handleSearch... nothing doing yet")
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

	gotoProfile = (uid) => {
		console.log("goto profile: " + uid)

		if (this.state.viewProfile !== uid) {
			this.setState({ viewProfile: uid });
		}
		if (this.state.mainContent !== 'profile') {
			this.setState({ mainContent: 'profile' });
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
										<TopBarPlayer song={this.state.currentSong} />
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
													<button id="Profile-Btn" onClick={this.openEditProfile}>My Profile</button>
													<button id="Logout-Btn" onClick={this.handleSignOut}>Logout</button>
												</div>
												<div id="Search-Div">
													<input id="Search-Input" />
													<button id="Search-Btn" onClick={this.handleSearch}>
														<div id="mag-glass">
															&#9906;
														</div>
													</button>
												</div>
												<button className="Main-Left-Menu-Btn" onClick={this.openStudio}>Studio</button>
												<button className="Main-Left-Menu-Btn" onClick={this.openSongWall}>Songwall</button>
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
												return <Studio UID={this.state.UID} goto={this.setMainContent} playSong={this.handleSetSong} />;
											case 'postsong':
												return <PostSong UID={this.state.UID} username={this.state.username} />;
											case 'record':
												return <RecordSong UID={this.state.UID} username={this.state.username} />;
											case 'editprofile':
												return <EditProfile user={this.state.user} gotoProfile={this.gotoProfile} goto={this.setMainContent} />;
											case 'changepw':
												return <ChangePassword email={this.state.email} />;
											case 'profile':
												return <Profile user={this.state.user} />;
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
