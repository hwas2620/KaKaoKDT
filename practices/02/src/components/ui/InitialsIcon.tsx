import React from 'react';
import './InitialsIcon.css';

interface InitialsIconProps {
    initials: string;
}

const _InitialsIcon = ({ initials }: InitialsIconProps) => {
    return (
        <span className="initials-icon">
            {initials}
        </span>
    );
}

export const InitialsIcon = React.memo(_InitialsIcon);