import React, { Component } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

export default class Lyrics extends Component {
    constructor(){
        super();
        this.state = {lyrics: ""};
    }
    
    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/' + this.props.songURL)
         .then(response => {
            const $ = cheerio.load(response.data);
            const lyricstext = $('.lyrics').text();
            this.setState({lyrics: lyricstext});
         })
         .catch((error) => {
            console.log(error);
         })
    }

    render() {
        return (
            <div>
                <pre>
                    {this.state.lyrics}
                </pre>
            </div>
        )
    }
}