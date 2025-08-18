import React, { useState } from 'react';

const HookDemo = () => {
    const [ count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        console.log(count);
    };

    return (
        <>
            <p>현재 카운트: {count}</p>
            <button onClick={handleClick}>증가</button>
        </>
    )
}

export default HookDemo;