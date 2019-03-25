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
                    {this.props.submission.name}
                </div>
                <div className="submission">
                    {this.props.submission.body}
                </div>
            </div>
        );
    }
}

export default ListItem;
