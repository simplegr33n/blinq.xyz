import React, { Component } from 'react';
import './styles/App.css';
// import Firebase from './config/firebaseConfig.js'

import PostSong from './components/main-content/PostSong.js'
import SongWall from './components/main-content/SongWall.js'


import react_logo from './assets/react-logo.svg';
import firebase_logo from './assets/firebase-logo.png'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mainContent: 'songwall' // postsong, songwall, record, mysongs, etc.
		};

		// this.firebase = new Firebase()
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
									Tunlinq
									<img src={react_logo} className="React-logo" alt="react-logo" />
									<img src={firebase_logo} className="Firebase-logo" alt="firebase-logo" />
								</div>
								<button className="Left-Menu-Btn">Song Wall</button>
								<button className="Left-Menu-Btn">Post Song</button>
								<button className="Left-Menu-Btn">My Songs</button>
							</div>
							<div id="Main-Content">
								<PostSong />
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default App;
