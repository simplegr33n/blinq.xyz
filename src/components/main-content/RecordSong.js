import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js';
import getBlobDuration from 'get-blob-duration';


class RecordSong extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            recording: false
        };

        this.firebase = new Firebase()
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                this.mediaRecorder = new MediaRecorder(stream)
                this.audioChunks = [];
                this.mediaRecorder.ondataavailable = e => {
                    if (e.data && e.data.size > 0) {
                        this.audioChunks.push(e.data);
                    }
                };
            })
    }

    postToFirebase(audioBlob, duration) {
        let date = new Date()
        let timestamp = date.getTime()

        // Get a key for a new song.
        var newPostKey = this.firebase.db.ref().child('user-songs').child(this.state.user.uid).push().key;

        // Get storage reference and push file blob 
        var storageRef = this.firebase.storage.ref().child('songs');
        const metadata = { contentType: 'audio/mpeg' };
        const storageTask = storageRef.child(this.state.user.uid).child(newPostKey).child(newPostKey + ".mp3").put(audioBlob, metadata);
        let songData;
        storageTask
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log(url)
                // A song entry for database.
                songData = {
                    url: url,
                    id: newPostKey,
                    songName: newPostKey,
                    artist: this.state.user.username,
                    info: "",
                    recorded: timestamp,
                    uploaded: timestamp,
                    uploader: this.state.user.uid,
                    uploaderName: this.state.user.username,
                    published: null,
                    duration: duration
                };


                // Write the new song's data the user's song list.
                var updates = {};
                updates['/user-songs/' + this.state.user.uid + '/' + newPostKey] = songData;

                return this.firebase.db.ref().update(updates);
            }).then(() => {
                this.props.goto('studio');
            });

    }

    async saveAudio() {
        // convert saved chunks to blob and get duration
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg-3' });
        const duration = await getBlobDuration(audioBlob)

        this.postToFirebase(audioBlob, duration)

    }

    startRecording = () => {
        // wipe old data chunks
        this.audioChunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
    }

    stopRecording = () => {
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // save the video to memory
        this.saveAudio();
    }


    handleRecordBtn = () => {
        console.log("record btn pressed...")
        if (!this.state.recording) {
            this.startRecording()
        } else {
            this.stopRecording()
        }
    }

    render() {
        return (
            <div id="Record-Page">

                <button id="Record-Record-Btn" onClick={this.handleRecordBtn} >
                    {(() => {
                        if (this.state.recording) {
                            return "STOP" // TODO: ideally show the recorded time here... 00:00:00
                        } else {
                            return "RECORD"
                        }
                    })()}
                </button>
                <audio id="recordedAudio" />

            </div>
        );
    }
}
export default RecordSong;
