import React, { Component } from 'react';
import '../../styles/listItem.css';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="ListItem">
                <div className="submitterName">
                    {this.props.submission.songName}
                </div>
                <div className="submission">
                    {this.props.submission.group}
                </div>
            </div>
        );
    }
}

export default ListItem;
