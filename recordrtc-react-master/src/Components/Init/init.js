import React, { Component } from 'react';
import Language from '../Language/Language';
import './App.css';

class Init extends Component {
    constructor() {
        super()
        this.state = {
            isSelected: true
        }
    }

    selectLanguage() {

    }

    render() {
        return (
          <div className="App">
            <div className="App-header" >
              <h2>Welcome to ReView</h2>
            </div>
            <Language languageEvent={this.selectLanguage} />
          </div>
        );
    }
}

export default Init;
