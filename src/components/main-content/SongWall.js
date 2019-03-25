import React, { Component } from 'react';
import '../../styles/main-content.css';
import Firebase from '../../config/firebaseConfig.js'

import ListItem from '../list-items/testListItem.js'

class SongWall extends Component {

    constructor(props) {
        super(props);
        this.state = {
			submission: '',
			posts: []
		};

        this.firebase = new Firebase()
		this.getPosts()
    }

    handleChange = (event) => {
		this.setState({ submission: event.target.value });
	}

	getPosts = () => {
		// Posts branch of tree
		var ref = this.firebase.db.ref().child('posts')

		ref.on('child_added', snapshot => {
			const previousPosts = this.state.posts;
			previousPosts.push({
				name: snapshot.val().name,
				body: snapshot.val().body
			});
			this.setState({
				posts: previousPosts
			});
		});
	}

    render() {
        return (
            <div>
                <div id="App-right">
                    {this.state.posts.map((item) => (<ListItem submission={item} />))}
                </div>
            </div>
        );
    }
}

export default SongWall;
