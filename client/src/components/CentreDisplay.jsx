import React from 'react';
import RecipePage from './RecipePage';
import {Routes, Route} from 'react-router-dom';
import RecipeList from './RecipeList';
import AddNewRecipe from './AddNewRecipe';



function CentreDisplay() {
    
    
    return (  
        <div className='centeredDark'>
        <Routes>
            <Route path='/' element={<RecipeList type="" />} />
            <Route path='/search/:searchQuery' element={<RecipeList type="search" />} />
            <Route path='/recipes/:recipeName' element={<RecipePage />} />
            <Route path='/AddNew' element={<AddNewRecipe />} />
        </Routes>
        </div>
    );
    
    
}

export default CentreDisplay;
