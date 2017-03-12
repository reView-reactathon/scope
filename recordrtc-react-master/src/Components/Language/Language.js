import React from 'react';
import devlogo from '../../../assets/dev-icon.svg';
import './Language.css';

const langObj = [
    'Javascript',
    'Java',
    'PHP',
    'Python',
    'Objective-C',
    'Ruby'
];

const Language = (props) => {
    const listItems = langObj.map( (value, index) =>
        <li key={index}><span onClick={props.languageEvent}>{value}</span></li>
    );

    return (
        <div className="language-wrapper">
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col language-container">
                    <h3>
                        <img src={devlogo} alt="dev logo"/> Select Language
                    </h3>
                    <ul> {listItems} </ul>
                </div>
            </div>
        </div>
    )
}

export default Language;
