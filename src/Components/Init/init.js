import React, { Component } from 'react';
import Language from '../Language/Language';
import StartInterview from '../StartInterview/StartInterview'
import QuestionForm from '../Questions/QuestionForm';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Init extends Component {
    render() {
        return (
          <div className="App">
            <div className="App-header">
              <h2>Welcome to ReView</h2>
            </div>
            <Router>
                <div>
                  <ul>
                    <li><Link to="/">Languages</Link></li>
                    <li><Link to="/create">Create Question</Link></li>
                    <li><Link to="/interview">Start Interview</Link></li>
                  </ul>

                  <Route exact path="/" component={Language}/>
                  <Route path="/create" component={QuestionForm}/>
                  <Route path="/interview" component={StartInterview}/>
                </div>
            </Router>
          </div>
        );
    }
}

export default Init;
