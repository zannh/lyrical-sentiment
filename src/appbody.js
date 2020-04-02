import React, { Component } from 'react';
import axios from 'axios';

export default class AppBody extends Component {
    constructor() {
        super();
        this.state = {
            query: ""
        }
    }

    onQueryChange = (e) => {
        this.setState({query: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.get('http://api.genius.com/search?q=' + this.state.query + "&access_token=" + process.env.REACT_APP_GENIUS_CLIENT_TOKEN)
         .then(response => {
            console.log(response.data.response.hits);
         })
         .catch((error) => {
            console.log(error);
         })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="Enter song title..." value={this.state.query} onChange={this.onQueryChange}></input>
            <input type="submit" value="Go"></input>
            </form>
        )
    }
}