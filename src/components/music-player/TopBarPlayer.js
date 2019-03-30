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

		this.seekBar = React.createRef()
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

		console.log("os" + e.target.offsetLeft);
		// console.log("width" + e.width);
		console.log("width" + this.seekBar.current.offsetWidth);
		console.log("pagex" + e.pageX);

		let seekRatio = (e.pageX - e.target.offsetLeft) / this.seekBar.current.offsetWidth
		console.log("pctage" + seekRatio);

		this.audioPlayer.currentTime = (this.audioPlayer.duration * seekRatio)

		// console.log(e)
		// console.log("offset" + e.offset)
		// console.log(e.pageX + " " + e.pageY)


	}

	render() {
		if (this.state.song !== null) {
			return (
				<div id="Top-Bar-Player">
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
		else {
			return (
				<div></div>
			)
		}
	}

}

export default TopBarPlayer;
