import React, { Component } from 'react';
import Language from './components/Language/Language';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to ReView</h2>
        </div>
        <Language />
      </div>
    );
  }
}

export default App;
