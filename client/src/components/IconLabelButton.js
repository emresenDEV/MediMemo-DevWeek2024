import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './portals.css';

// to install fontawesome, run: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons



// Generic IconLabelButton component
function IconLabelButton({ icon, label, onClick }) {
    return (
        <div className="icon-label-button" onClick={onClick}>
            <div className="icon-container">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="label">{label}</div>
        </div>
    );
}

export default IconLabelButton;
