import React, { Component } from 'react';
import axios from 'axios';
import SongCard from './songcard';
import Lyrics from './lyrics';

export default class AppBody extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            queryResult: [],
            songURL: "",
            display: "songlist"
        }
    }

    onQueryChange = (e) => {
        this.setState({query: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.get('http://api.genius.com/search?q=' + this.state.query + "&access_token=" + process.env.REACT_APP_GENIUS_CLIENT_TOKEN)
         .then(response => {
            this.setState({queryResult: response.data.response.hits, display: "songlist"});
         })
         .catch((error) => {
            console.log(error);
         })
    }

    onSelectSong = (e) => {
        this.setState({songURL: e.target.id, display: "lyrics"});
        console.log(this.state.songURL);
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
                {this.state.display==="lyrics" ? <Lyrics songURL={this.state.songURL}></Lyrics> : this.state.queryResult.map(currentSong => {
                    return (<SongCard title={currentSong.result.full_title} onClick={this.onSelectSong} songID={currentSong.result.url}></SongCard>);
                })}
            </div>
            </div>    
            
        )
    }
}