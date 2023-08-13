export const GET_RECIPES = 'GET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
import axios from 'axios';

export const getRecipes = (recipes) => {
    return {
        type: GET_RECIPES,
        payload: recipes,
    }
}


export const addRecipe = (recipe) => {
    const endPoint = 'http://localhost:3001/recipes';

    return async (dispatch) => {

        try {
            let {data} = await axios.post(endPoint, recipe);

            return dispatch({
                type: ADD_RECIPE,
                payload: data,
            })
        } catch (error) {
            return console.log(error.message);
        }
    }
};

