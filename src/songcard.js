import React, { Component } from 'react';

export default class SongCard extends Component {
    render() {
        return (
            <div>
                {this.props.title}
            </div>
        )
    }
}