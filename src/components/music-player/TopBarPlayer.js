import React, { Component } from 'react';
import '../../styles/music-player.css';

class TopBarPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			song: {},
			fillPosition: "0%"
		};

		this.audioPlayer = new Audio();
		this.audioPlayer.addEventListener('timeupdate', () => {
			var position = this.audioPlayer.currentTime / this.audioPlayer.duration;

			this.setState({ fillPosition: position * 100 + '%' });
		});
	}

	componentWillReceiveProps(props) {
		console.log("topbarplayer: will receive props" + props + "this.props.song:" + this.props.song)
		if (this.props.song === null || this.props.song === undefined) {
			return;
		}

		console.log("topbarplayer: " + this.props.song)

		if (this.props.song !== this.state.song) {
			this.setState({
				song: this.props.song
			});
			this.audioPlayer.src = this.props.song.url;
			this.audioPlayer.play();
		}
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
