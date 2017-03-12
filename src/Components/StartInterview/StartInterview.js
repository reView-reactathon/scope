import React, { Component } from 'react';
import RecordPage from '../RecordPage/RecordPage.react';
import './StartInterview.css'

class StartInterview extends Component {
    constructor() {
        super();
        this.state = {
            videoHasRendered: false
        }
    }

    buttonEvent() {
        this.setState({videoHasRendered: true});
    }

    renderVideo() {
        if (!this.state.videoHasRendered) {
            return (
                <div className="mdl-grid">
                  <div className="container">
                      <div className="mdl-cell mdl-cell--12-col">
                        <div className="interview-video-template">
                            <button
                            onClick={this.buttonEvent.bind(this)}
                            className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                                Start Interview
                            </button>
                        </div>
                      </div>
                  </div>
                </div>
            )
        } else {
            return <RecordPage />
        }
    }

    render() {
        return (
            <div className="interview-wrapper">
                {this.renderVideo()}
            </div>
        )
    }
}

export default StartInterview;
