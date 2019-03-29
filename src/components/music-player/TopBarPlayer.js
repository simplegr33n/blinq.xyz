import React, { Component } from 'react';
import '../../styles/music-player.css';

class TopBarPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			song: null,
			fillPosition: "0%"
		};

		this.audioPlayer = new Audio();
		this.audioPlayer.loop = false;
		this.audioPlayer.addEventListener('timeupdate', () => {
			var position = this.audioPlayer.currentTime / this.audioPlayer.duration;
			this.setState({ fillPosition: position * 100 + '%' });
		});
	}

	componentWillUpdate(props) {
		if (props.song === null || props.song.url === undefined) {
			return;
		}
		if (this.state.song !== null && props.song.id === this.state.song.id) {
			return;
		}

		this.setState({ song: props.song });
		this.audioPlayer.src = props.song.url;
		this.audioPlayer.play();
	}

	handlePlayOrPause = () => {
		if (this.audioPlayer.src === '') {
			alert("No file!")
			return;
		}
		if (this.audioPlayer.ended || this.audioPlayer.paused) {
			this.audioPlayer.play();
			return;
		}
		if (!this.audioPlayer.ended && !this.audioPlayer.paused) {
			this.audioPlayer.pause();
			return;
		}
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
				<div id="seek-bar">
					<div id="fill" style={{ width: this.state.fillPosition }}></div>
					<div id="handle"></div>
				</div>
				<div id="Top-Player-Btns">
					<button>&#9198; </button>
					<button id="TP-Play-Pause-Btn" onClick={this.handlePlayOrPause}>&#9654; / &#9208;</button>
					<button>&#9197;</button>
				</div>
			</div>
		);
	}
}

export default TopBarPlayer;
