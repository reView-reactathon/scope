import React from 'react';
import devlogo from '../../../assets/dev-icon.svg';
import './Language.css';

const Language = () => {
    return (
        <div className="language-wrapper">
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--4-col">
                    <h3>
                        <img src={devlogo} alt="dev logo"/> Select Language
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Language;
