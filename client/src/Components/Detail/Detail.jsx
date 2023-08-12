import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detail () {
    
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    let allSteps;

    useEffect(() => {
        axios(`http://localhost:3001/recipes/${id}`).then(({data}) => {
            setRecipe(data);
        });
        return setRecipe({});
    },[id]);

    if (recipe.analyzedInstructions){  
        allSteps = recipe.analyzedInstructions[0].steps;
    }
    console.log(allSteps);
    return (
        <div>
            <img src={recipe.image} alt="Imagen receta"></img>
            <h2>{recipe.title || recipe.name}</h2>
            <label>ID: {id}</label>
            <h4>Summary: </h4>
            <p dangerouslySetInnerHTML={{ __html:recipe.summary}}></p>
            <h4>Health Score: {recipe.healthScore}</h4>
            <ul>
                Diets:
                {recipe.diets ? recipe.diets.map((diet) => {
                    return <li key={diet}>{diet}</li>
                }): 'There are not diets'}
            </ul>
            <table>
                <th>Steps: </th>
                <tr>
                    <td></td>
                </tr>
            </table>
            
        </div>
    )
}