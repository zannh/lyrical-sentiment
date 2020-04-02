import React, { Component } from 'react';
import axios from 'axios';

function CalculationDisplay(props) {
    if (props.words.length > 0) {
        if (parseFloat(props.score) > 0){
            return (
                <div>
                    {JSON.stringify(props.words)} <br></br>
                    <b>Score: {props.score}</b> <br></br>
                    <i>This song has a positive sentiment :)</i>
                </div>
            )
        } else if (props.score === "0.00") {
            return (
                <div>
                    {JSON.stringify(props.words)} <br></br>
                    <b>Score: {props.score}</b> <br></br>
                    <i>This song has a mixed or neutral sentiment :/</i>
                </div>
            )
        } else {
            return (
                <div>
                    {JSON.stringify(props.words)} <br></br>
                    <b>Score: {props.score}</b> <br></br>
                    <i>This song has a negative sentiment :(</i>
                </div>
            )
        }
    } else {
        return <div>CALCULATING...</div>
    }
}

export default class Lyrics extends Component {
    constructor(){
        super();
        this.state = {
            lyrics: "",
            words: [],
            score: ""
        };
    }
    
    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/' + this.props.songURL)
         .then(response => {
            const cheerio = require('cheerio');
            const $ = cheerio.load(response.data);
            const lyricstext = $('.lyrics').text();
            this.setState({lyrics: lyricstext.trimLeft()});
            this.analyseLyrics();
         })
         .catch((error) => {
            console.log(error);
         })
    }

    analyseLyrics() {
        var Sentiment = require('sentiment');
        var analyser = new Sentiment();
        var analysis = analyser.analyze(this.state.lyrics);
        this.setState({words: analysis.calculation, score: (analysis.score/analysis.calculation.length).toFixed(2)})
    }

    render() {
        return (
            <div>
                <div>
                    <CalculationDisplay words={this.state.words} score={this.state.score}></CalculationDisplay>
                </div>
                <pre>
                    {this.state.lyrics}
                </pre>
            </div>
        )
    }
}