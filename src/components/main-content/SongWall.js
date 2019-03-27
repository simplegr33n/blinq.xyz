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
				artist: snapshot.val().artist,
				recorded: snapshot.val().recorded,
				info: snapshot.val().info,
				uploader: snapshot.val().uploader,
				uploaderName: snapshot.val().uploaderName,
				uploaded: snapshot.val().uploaded,
				published: snapshot.val().published,
				id: snapshot.val().id,
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
