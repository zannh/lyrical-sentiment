import React from 'react';
import './App.css';
import AppBody from './appbody.js';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Lyrical Sentiment</h1>
      </div>
      <div>
        <AppBody></AppBody>
      </div>
    </div>
  );
}

export default App;
