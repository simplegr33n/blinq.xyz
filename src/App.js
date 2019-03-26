import React, { Component } from 'react';
import './styles/App.css';
// import Firebase from './config/firebaseConfig.js'

import PostSong from './components/main-content/PostSong.js'
import SongWall from './components/main-content/SongWall.js'

import logo from './assets/logo.png'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mainContent: 'songwall' // postsong, songwall, mysongs, record, etc.
		};

		// this.firebase = new Firebase()
	}



	handleSubmit = () => {
		console.log("submitPressed: " + this.state.songName)

		this.setState({ groupName: '' });
		this.setState({ artistNames: '' });
		this.setState({ songInfo: '' });

		// Send to Firebase
		this.postToFirebase(777, "yarl", this.state.groupName, this.state.songName, this.state.artistNames, this.state.songInfo)
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
							<div id="Header-Btns">
								<button>Profile</button>
								<button>Logout</button>
							</div>
						</div>
						<div id="App-Body-Content">
							<div id="Main-Left-Menu">
								<div id="Home-Div">
									<img src={logo} className="Muslinq-logo" alt="muslinq-logo" />
								</div>
								<button className="Left-Menu-Btn" onClick={this.openSongWall}>Song Wall</button>
								<button className="Left-Menu-Btn" onClick={this.openMySongs}>My Songs</button>
								<button className="Left-Menu-Btn" onClick={this.openPostSong}>Post Song</button>
							</div>
							<div id="Main-Content">
								{(() => {
									switch (this.state.mainContent) {
										case 'songwall':
											return <SongWall />;
										case 'postsong':
											return <PostSong />;
										default:
											return <SongWall />;
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
