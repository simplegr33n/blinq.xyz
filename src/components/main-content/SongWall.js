import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import SongListItem from '../list-items/SongListItem.js'


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
				artistName: snapshot.val().artist,
				recordingDate: snapshot.val().recorded,
				songInfo: snapshot.val().info,
				songLength: '3:33' // Placeholder
			});
			this.setState({
				songs: previousSongs
			});
		});
	}

	render() {
		return (
			<div id="Songs-List">
				{this.state.songs.map((s) => (<SongListItem song={s} />))}
			</div>
		);
	}
}

export default SongWall;
