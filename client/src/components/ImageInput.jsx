import React, {useState} from 'react';

function ImageInput(props) {
    const handleChange = (event) => {
        const file = event.target.files[0];
        props.setInputs(values => ({...values, recipePrevImage: file}))
    }

    return (
        <div className='mb-3 col-md-6'>
            <label htmlFor='prevImage' >Upload preview image</label>
            <input onChange={handleChange} type="file" id="prevImage" className='form-control' name='recipePrevImage' />                    
        </div>
    );
}

export default ImageInput;