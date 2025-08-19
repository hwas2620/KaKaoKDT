import React from 'react';
import './InitialsIcon.css';

function InitialsIcon({ initials}) {
    return (
        <span className="initials-icon">
            {initials}
        </span>
    );
}

export default React.memo(InitialsIcon);