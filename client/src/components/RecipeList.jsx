import React, {useEffect, useState} from 'react';
import RecipeCard from './RecipeCard';
import axios from "axios";
import { useParams} from "react-router-dom";

const client = axios.create({
  baseURL: "http://localhost:5000" 
});


function RecipeList(props) {
    const [recipes1, setrecipes1] = useState(null);

    const { searchQuery } = useParams();

    let url = '/';

    if (props.type==='search') {
        url = url + "search/" + searchQuery;
    }

    useEffect(() => {
        client.get(encodeURI(url)).then((response) => {
            setrecipes1(response.data);
        });
    }, [url]);

    if (recipes1 === null) {
        return (<h1>Loading...</h1>)
    } else {
        return (
            <div className='row'>
                    {props.type==='search' ? <div><h3>Search results below:</h3><hr></hr></div>: <></>}
                {recipes1.map((currentrecipe, index) => {
                    return (<RecipeCard id={index} key={index} title={currentrecipe.recipeTitle} prevText={currentrecipe.recipeDescripton} imgSource={currentrecipe.recipePrevImage.s3Key}  />)
                })}
            </div>
        )
    }
}

export default RecipeList;
