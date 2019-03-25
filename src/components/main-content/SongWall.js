import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import ListItem from '../list-items/testListItem.js'

class SongWall extends Component {

	constructor(props) {
		super(props);
		this.state = {
			songs: []
		};

		this.firebase = new Firebase()
		this.getSongs()
	}

	getSongs = () => {
		// Posts branch of tree
		var ref = this.firebase.db.ref().child('songs')

		ref.on('child_added', snapshot => {
			const previousSongs = this.state.songs;
			previousSongs.push({
				songName: snapshot.val().songName,
				group: snapshot.val().group
			});
			this.setState({
				songs: previousSongs
			});
		});
	}

	render() {
		return (
			<div id="Songs-List">
				{this.state.songs.map((item) => (<ListItem submission={item} />))}
			</div>
		);
	}
}

export default SongWall;
