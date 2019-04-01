import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import SongListItem from '../list-items/SongListItem.js'


class SongWall extends Component {

	constructor(props) {
		super(props);
		this.state = {
			songs: [],
			lastProps: null
		};

		this.firebase = new Firebase()
		
	}

	componentDidMount() {
		console.log("SongWall component mounted")
		this.getSongs()
	}

	getSongs = () => {
		// Songs branch of tree
		var ref = this.firebase.db.ref().child('songs')

		ref.on('child_added', snapshot => {
			const previousSongs = this.state.songs;
			previousSongs.push({
				url: snapshot.val().url,
				songName: snapshot.val().songName,
				artist: snapshot.val().artist,
				recorded: snapshot.val().recorded,
				info: snapshot.val().info,
				uploader: snapshot.val().uploader,
				uploaderName: snapshot.val().uploaderName,
				uploaded: snapshot.val().uploaded,
				published: snapshot.val().published,
				id: snapshot.val().id,
				duration: snapshot.val().duration
			});
			this.setState({
				songs: previousSongs
			});
		});
	}

	handleSetSong = (setValue) => {
		// set song in App.js
		console.log("SongWall: handleSetSong(" + setValue.songName);
		this.props.setSong(setValue);
	}

	gotoProfile = (uid) => {
		console.log("SongWall: gotoProfile(" + uid);
		this.props.gotoProfile(uid);
	}

	gotoSongDetails = (id) => {
		console.log("SongWall: gotoSongDetails(" + id);
		this.props.gotoSongDetails(id)
	}

	render() {
		return (
			<div id="Songs-List">
				{this.state.songs.map((song) => (
					<SongListItem
						song={song}
						key={song.id}
						setSong={this.handleSetSong}
						setProfile={this.gotoProfile}
						setSongDetails={this.gotoSongDetails}/>
					))}
			</div>
		);
	}
}

export default SongWall;
