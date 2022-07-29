import React, {useState} from 'react';

function IngredientsInput(props) {
    const [ingredient, setIngredient] = useState({
        ingredientId: 1,
        ingredientName: "",
        ingredientAmount: undefined,
        ingredientUnit: ""
    });

    const ingredients = props.inputs.recipeIngredients;

    function addIngredientToList(currentIngredient) {
        props.setInputs(values => ({...values, recipeIngredients: [...values.recipeIngredients, currentIngredient]}));
    }
    
    function deleteIngredientFromList(index) {
        setIngredient(prevValue => ({...prevValue, ingredientId: prevValue.ingredientId - 1}));

        props.setInputs(values => {
            return ({...values, recipeIngredients: values.recipeIngredients.filter((tag, i) => i !== index)});
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
    
        setIngredient((prevValue) => {
          return { ...prevValue, [name]: value };
        });
    }

    return(
        
        <div className="mb-3">
            <h4>Ingredients</h4>
            <hr></hr>
            <div className='mb-3 row'>
                {ingredients.map((currentIngredient, index) => (
                    <div key={index} className='mb-3 col-md-3'>
                        <h3>{currentIngredient.ingredientName} : {currentIngredient.ingredientAmount} {currentIngredient.ingredientUnit}</h3>
                        <button className="btn btn-outline-dark" onClick={() => deleteIngredientFromList(index)}>x</button>
                    </div>
                ))}
            </div>
            <div className='mb-3 row'>
                <div className ="mb-3 col-md-6">
                <input
                    className ='form-control'
                    type="text"
                    onChange={handleChange}
                    name="ingredientName"
                    placeholder="Ingredient name"
                    value={ingredient.ingredientName}
                />
                </div>
                <div className ="mb-3 col-md-3">
                <input
                    className ='form-control'
                    type="number"
                    onChange={handleChange}
                    name="ingredientAmount"
                    placeholder="Ingredient amount"
                    value={ingredient.ingredientAmount || ''}
                />
                </div>
                <div className ="mb-3 col-md-2">
                    <select className="form-control" name='ingredientUnit' onChange={handleChange} value={ingredient.ingredientUnit}>
                        <option value="">--choose unit--</option>
                        <option value="L">L</option>
                        <option value="mL">mL</option>
                        <option value="g">g</option>
                        <option value="mg">mg</option>
                        <option value="tbsp">tbsp</option>
                    </select>
                </div>
                <div className='mb-3 col-md-1'>
                <button
                    className="btn btn-outline-dark"
                    onClick={(event) => {
                        event.preventDefault();
                        if (ingredients.find(({ingredientName}) => (ingredientName===ingredient.ingredientName))) {
                            alert("Two ingredients cannot share the same name!")
                        } else {
                            
                            addIngredientToList(ingredient);
                            setIngredient((prevValue) => ({
                                ingredientId: prevValue.ingredientId + 1,
                                ingredientName: "",
                                ingredientAmount: undefined,
                                ingredientUnit: ""
                            })); 
                        }
                    }}
                    >
                    Add
                </button>
                </div>
            </div>
        </div>
    );
}

export default IngredientsInput;