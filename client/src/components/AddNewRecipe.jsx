import React, {useState} from 'react';
import TagsInput from './TagsInput';
import IngredientsInput from './IngredientsInput';
import StepsInput from './StepsInput';
import axios from "axios";
import ImageInput from './ImageInput';

function AddNewrecipe() {
    const [inputs, setInputs] = useState({
        recipeTitle: "",
        recipeIngredients: [],
        recipeDescripton: "",
        recipeIsVeg: "",
        recipeTags: [],
        recipePrevImage: {},
        recipeCalories: undefined,
        recpiesteps: []
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name==='recipePrevImage') {
            const file = event.target.files[0];
            setInputs(values => ({...values, recipePrevImage: file}))
        } else {
            setInputs(values => ({...values, [name]: value}));
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('recipeTitle',inputs.recipeTitle);
        formData.append('recipeIngredients',JSON.stringify(inputs.recipeIngredients));
        formData.append('recipeDescripton',inputs.recipeDescripton);
        formData.append('recipeIsVeg',inputs.recipeIsVeg);
        formData.append('recipeTags',inputs.recipeTags);
        formData.append('recipePrevImage',inputs.recipePrevImage);
        formData.append('recipeCalories',inputs.recipeCalories);
        formData.append('recpiesteps',JSON.stringify(inputs.recpiesteps));

        console.log(inputs);

        axios.post('http://localhost:5000/recipes/addNew',formData)
            .then(res => {
                console.log(res);
                alert(res.data);
                setInputs({
                    recipeTitle: "",
                    recipeIngredients: [],
                    recipeDescripton: "",
                    recipeIsVeg: "",
                    recipeTags: [],
                    recipePrevImage: {},
                    recipeCalories: undefined,
                    recpiesteps: []
                });
            })
            .catch(err => {
                console.log(err);
                alert("Error:" + err);
            });
    }

    return (
        <div>
        <h2>Enter details</h2>
        <hr></hr>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className ="mb-3 row">
                <div className ="mY-3 col-md-6">   
                    <input 
                        className='form-control' 
                        type="text" 
                        name="recipeTitle"
                        placeholder='Enter recipe name' 
                        value={inputs.recipeTitle} 
                        onChange={handleChange}
                    />
                </div>
                <div className ="mY-3 col-md-4">
                    <input 
                        className ='form-control'
                        type="number" 
                        name="recipeCalories"
                        placeholder='Enter recipe calories' 
                        value={inputs.recipeCalories || ''} 
                        onChange={handleChange}
                    />
                </div>
                <div className ="mY-3 col-md-2">
                    <select className="form-control" name='recipeIsVeg' onChange={handleChange} value={inputs.recipeIsVeg}>
                        <option value="">--choose--</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">non-Veg</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 col-md-12"> 
                <textarea 
                    className='form-control' 
                    type="text" 
                    name="recipeDescripton"
                    placeholder="Enter recipe description"
                    value={inputs.recipeDescripton} 
                    onChange={handleChange}
                />
            </div>
            <ImageInput inputs={inputs} setInputs={setInputs} />
            <TagsInput inputs={inputs} setInputs={setInputs} />
            <IngredientsInput inputs={inputs} setInputs={setInputs} />
            <StepsInput inputs={inputs} setInputs={setInputs} />
            <button type="submit" className="btn btn-outline-dark">submit</button>
        </form>
        </div>
    );
}

export default AddNewrecipe;