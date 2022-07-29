import React from 'react';

function Ingredient(props) {
    return (
        
            <div className='mb-3 col-md-3'>
                <h3>{props.name} : {props.amount} {props.unit}</h3>
            </div>

    )
}

export default Ingredient;