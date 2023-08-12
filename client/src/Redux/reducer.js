import {
  GET_RECIPES,
  ADD_RECIPE,
  FILTER_DIETS,
  FILTER_RECIPES,
  ORDER,
} from "./actions";

const initialState = {
  myRecipes: [],
  allRecipes: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        myRecipes: action.payload,
        allRecipes: action.payload,
      };

    case ADD_RECIPE:
      return {
        ...state,
        myRecipes: action.payload,
        allRecipes: action.payload,
      };

    case FILTER_DIETS:
      return {
        ...state,
        myRecipes:state.allRecipes.filter((recipe) => recipe.diets.includes(action.payload)),
      };

    case FILTER_RECIPES:
      return {};

    case ORDER:
      return {};

    default:
      return { ...state };
  }
}
