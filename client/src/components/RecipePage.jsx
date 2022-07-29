import React, {useEffect, useState } from 'react';
import { useParams} from "react-router-dom";
import Step from './Step';
import axios from "axios";
import Ingredient from './Ingredient';

const client = axios.create({
    baseURL: "http://localhost:5000" 
});

function RecipePage() {
    const { recipeName } = useParams();

    const [img, setImg] = useState();

    const [recipe, setrecipe] = useState(null);

    const url = encodeURI('/' + recipeName);

    useEffect(() => {
        client.get(url).then((response) => {
            setrecipe(response.data);
            fetchImage(response.data.recipePrevImage.s3Key);
        });
        
    }, []);

    const fetchImage = async function(s3Key) {
        const res = await client.get('/images/' + s3Key);

        setImg(res.data);
    }

    if (recipe === null) {
        return (<h1>Loading...</h1>);
    } else {
    return (
        <div>
            <div className='recipePageTitle'>
                <div className='recipePageImage'>   
                    <img src={img} alt='recipeImage' style={{ height:"100%", width: "100%", objectFit: "contain" }}/>
                </div>
                <div className='recipePageDesc'>
                    <h1>{recipe.recipeTitle} </h1>
                    <hr></hr>
                    <p>{recipe.recipeDescripton}</p>
                </div>
            </div>
            <div className='step'>
            <h3>Ingredients</h3><hr></hr>
            <div className='mb-3 row' style={{backgroundColor: "#FFE5B4"}}>
                {recipe.recipeIngredients.map((ing) => {
                    return (<Ingredient key={ing.ingredientId} name={ing.ingredientName} amount={ing.ingredientAmount} unit={ing.ingredientUnit} />);
                })}
            </div>
            </div>
            <div className='recipePageSteps'>
                {recipe.recpiesteps.map((step) => {
                    return (<Step key={step.stepId} stepNumber={step.stepId} stepTitle={step.stepTitle} stepDesc={step.stepDescription} />)
                })}
            </div>
        </div>
    );
            }
}

export default RecipePage;