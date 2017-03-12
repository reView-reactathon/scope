import React, { Component } from 'react';
import Language from '../Language/Language';
import StartInterview from '../StartInterview/StartInterview'
import './App.css';

class Init extends Component {
    constructor() {
        super()
        this.state = {
            isSelected: false
        }
    }

    selectLanguage() {
        this.setState({isSelected: true});
    }

    toggleComponent() {
        if (!this.state.isSelected) {
            return <Language
            languageEvent={this.selectLanguage.bind(this)}
            isSelected={this.state.isSelected}
            />
        } else {
            return <StartInterview />
        }
    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <h2>Welcome to ReView</h2>
            </div>
            { this.toggleComponent() }
          </div>
        );
    }
}

export default Init;
