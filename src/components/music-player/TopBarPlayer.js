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
		this.audioPlayer.addEventListener('timeupdate', () => {
			var position = this.audioPlayer.currentTime / this.audioPlayer.duration;

			this.setState({ fillPosition: position * 100 + '%' });
		});
		this.url = null;
	}


	componentDidUpdate(props) {
		console.log(props)
		console.log("update?" + props + this.state.song)

		if (props.song != null && this.state.song !== props.song) {
			this.setState({ song: props.song });
			console.log("update url?" + props.song.url)
			this.url = props.song.url
			this.playFromProps();
		}
	}

	playFromProps = () => {
		console.log("p from props" + this.props.song.url)
		if (this.url !== this.props.song.url) {
			this.url = this.props.song.url;
			this.audioPlayer.src = this.props.song.url;
			console.log("plyr src" + this.audioPlayer.src)
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
