import React, { Component } from 'react';
import axios from 'axios';
import SongCard from './songcard';

export default class AppBody extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            queryResult: []
        }
    }

    onQueryChange = (e) => {
        this.setState({query: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.get('http://api.genius.com/search?q=' + this.state.query + "&access_token=" + process.env.REACT_APP_GENIUS_CLIENT_TOKEN)
         .then(response => {
            this.setState({queryResult: response.data.response.hits});
            console.log(this.state.queryResult)
         })
         .catch((error) => {
            console.log(error);
         })
    }

    render() {
        return (
            <div>
                <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Enter song title..." value={this.state.query} onChange={this.onQueryChange}></input>
                    <input type="submit" value="Go"></input>
                </form>
            </div>
            <div>
                {this.state.queryResult.map(currentSong => {
                    return <SongCard title={currentSong.result.full_title} key={currentSong.result.id}></SongCard>;
                })}
            </div>
            </div>    
            
        )
    }
}