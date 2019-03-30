import React, { Component } from 'react';
import '../../styles/music-player.css';

class TopBarPlayer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			song: null,
			musicPosition: "0%",
			volumePosition: "100%"
		};

		this.audioPlayer = new Audio();
		this.audioPlayer.loop = false;
		this.audioPlayer.addEventListener('timeupdate', () => {
			var position = this.audioPlayer.currentTime / this.audioPlayer.duration;
			this.setState({ musicPosition: (position * 100) + '%' });
		});
		this.audioPlayer.addEventListener('volumechange', () => {
			var position = this.audioPlayer.volume;
			console.log("volume!" + position)
			this.setState({ volumePosition: (position * 100) + '%' });
		});
		

		this.seekBar = React.createRef()
		this.volumeBar = React.createRef()
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

	handleSeekBarClick = (e) => {
		let seekRatio = (e.pageX - e.target.offsetLeft) / this.seekBar.current.offsetWidth

		this.audioPlayer.currentTime = (this.audioPlayer.duration * seekRatio)
	}

	handleVolumeBarClick = (e) => {
		let volumeRatio = 1 - ((e.pageY - e.target.offsetTop) / this.volumeBar.current.offsetHeight)
		if (volumeRatio <= 0.05) {
			volumeRatio = 0;
		} else if (volumeRatio >= 0.95) {
			volumeRatio = 1;
		}

		console.log(`hero... ${(e.pageY - e.target.offsetTop) / this.volumeBar.current.offsetHeight}`)
		console.log(`2... ${1- ((e.pageY - e.target.offsetTop) / this.volumeBar.current.offsetHeight)}`)

		this.audioPlayer.volume = volumeRatio;
	}

	render() {
		if (this.state.song !== null) {
			return (
				<div id="Top-Bar-Player">
					<div id="Top-Player-Center-Div">
						<div id="Top-Player-Info-Div">
							<div id="Top-Player-Artist">
								{this.state.song.artist}
							</div>
							&nbsp;-&nbsp;
						<div id="Top-Player-Song">
								{this.state.song.songName}
							</div>
						</div>
						<div id="seek-bar" ref={this.seekBar} onClick={this.handleSeekBarClick}>
							<div id="fill" style={{ width: this.state.musicPosition }}></div>
							<div id="handle"></div>
						</div>
						<div id="Top-Player-Btns">
							<button>&#9198; </button>
							<button id="TP-Play-Pause-Btn" onClick={this.handlePlayOrPause}>&#9654; / &#9208;</button>
							<button>&#9197;</button>
						</div>
					</div>
					<div id="volume-bar" ref={this.volumeBar} onClick={this.handleVolumeBarClick}>
							<div id="volume-fill" style={{ height: this.state.volumePosition }}></div>
							<div id="volume-handle"></div>
					</div>
				</div>
			);
		}
		else {
			return (
				<div></div>
			)
		}
	}

}

export default TopBarPlayer;
