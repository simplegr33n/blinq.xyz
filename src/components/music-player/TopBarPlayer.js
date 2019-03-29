import React, { Component } from 'react';
import '../../styles/music-player.css';

class TopBarPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			song: this.props.song
		};

		this.audioPlayer = new Audio();
	}

	playSong = () => {
		this.audioPlayer.src = "song01.mp3";
		this.audioPlayer.play();
	}

	render() {
		return (
			<div id="Top-Bar-Player">
				<div id="Top-Player-Info-Div">
					<div>
						Artist
					</div>
					-
					<div>
						Song
					</div>
				</div>
				<div id="Top-Player-Time-Bar">
					|-------&#9679;---------------------------------------|
				</div>
				<div id="Top-Player-Btns">
					<button>&#9198; </button>
					<button onClick={this.playSong}>&#9654; / &#9208;</button>
					<button>&#9197;</button>
				</div>
			</div>
		);
	}
}

export default TopBarPlayer;
