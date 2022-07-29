import React from 'react';

function Step(props) {
    return (
        <div className='step'>
        <h3>Step {props.stepNumber} - {props.stepTitle}</h3>
        <hr></hr>
        <p>{props.stepDesc}</p>
        </div>
    )
}

export default Step;
