import React, { Component } from 'react';
import '../../styles/music-player.css';

class TopBarPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			song: this.props.song,
			fillPosition: "0%"
		};

		this.audioPlayer = new Audio();
		this.audioPlayer.addEventListener('timeupdate', () => {
			var position = this.audioPlayer.currentTime / this.audioPlayer.duration;

			this.setState({ fillPosition: position * 100 + '%' });
		});
	}

	playSong = () => {
		console.log(this.audioPlayer.src + " SRUCE")
		this.audioPlayer.src = "song01.mp3";
		console.log(this.audioPlayer.src + " SRUCE")
		this.audioPlayer.play();
	}

	handlePlayOrPause = () => {
		if (this.audioPlayer.src === '') {
			this.audioPlayer.src = "song01.mp3";
			console.log(`audioPlayer add src: ${this.audioPlayer.src}`)
			console.log(`audioPlayer play src: ${this.audioPlayer.src}`)
			this.audioPlayer.play();
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
                    <div id="fill" style={{width: this.state.fillPosition}}></div>
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
