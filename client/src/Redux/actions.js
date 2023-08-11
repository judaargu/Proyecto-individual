export const ADD_RECIPE = 'ADD_FAV';
export const FILTER_DIETS = 'FILTER_DIETS';
export const FILTER_RECIPES = 'FILTER_RECIPES';
export const ORDER = 'ORDER';
import axios from 'axios';


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

export const filterRecipes = (filter) => {
    return {
        type: FILTER_RECIPES,
        payload: filter,
    }
}

export const filterDiets = (diet) => {
    return {
        type: FILTER_RECIPES,
        payload: diet,
    }
}

export const order = (order) => {
    return {
        type: ORDER,
        payload: order,
    }
}