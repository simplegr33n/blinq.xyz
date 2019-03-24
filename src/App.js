import React, { Component } from 'react';
import './styles/App.css';
import Firebase from './config/firebaseConfig.js'

import ListItem from './components/listItem.js'
import react_logo from './assets/react-logo.svg';
import firebase_logo from './assets/firebase-logo.png'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			submission: '',
			posts: []
		};

		this.firebase = new Firebase()
		this.getPosts()
	}

	handleChange = (event) => {
		this.setState({ submission: event.target.value });
	}

	handleSubmit = () => {
		console.log("submitPressed: " + this.state.submission)
		this.setState({ submission: '' });

		// Send to Firebase
		this.postToFirebase(777, "yarl", "no.jpg", "Mr.", this.state.submission)
	}

	postToFirebase(uid, username, picture, title, body) {
		if (body === null || body.replace(/\s+/g, '') === "") {
			return;
		}

		// A post entry.
		var postData = {
			author: username,
			uid: uid,
			body: body,
			title: title,
			starCount: 0,
			authorPic: picture
		};

		// Get a key for a new Post.
		var newPostKey = this.firebase.db.ref().child('posts').push().key;

		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};
		updates['/posts/' + newPostKey] = postData;
		updates['/user-posts/' + uid + '/' + newPostKey] = postData;

		return this.firebase.db.ref().update(updates);
	}

	getPosts = () => {
		// Posts branch of tree
		var ref = this.firebase.db.ref().child('posts')

		ref.on('child_added', snapshot => {
			const previousPosts = this.state.posts;
			previousPosts.push({
				name: snapshot.val().name,
				body: snapshot.val().body
			});
			this.setState({
				posts: previousPosts
			});
		});
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
								</div>
								<button className="Left-Menu-Btn">Button</button>
								<button className="Left-Menu-Btn">Button</button>
								<button className="Left-Menu-Btn">Button</button>
								<button className="Left-Menu-Btn">Button</button>
							</div>
							<div id="Main-Content">
								<div id="App-left">
									<div>
										<img src={react_logo} className="React-logo" alt="react-logo" />
										<img src={firebase_logo} className="Firebase-logo" alt="firebase-logo" />
									</div>
									<p>Post something to Firebase:</p>
									<div>
										<textarea id="submit-text-area" value={this.state.submission} onChange={this.handleChange} />
										<div id="post-button" onClick={this.handleSubmit}>
											<div className="button-text">
												Firebase Post
              							</div>
										</div>
										<div id="get-button" onClick={this.getPosts}>
											<div className="button-text">
												Firebase Get
              							</div>
										</div>
									</div>
								</div>
								<div id="App-right">
									{this.state.posts.map((item) => (<ListItem submission={item} />))}
								</div>
							</div>
						</div>
					</div>





				</header>
			</div>
		);
	}
}

export default App;
