import React, { Component } from 'react';

export default class SongCard extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} id={this.props.songID}>
                {this.props.title}
            </div>
        )
    }
}