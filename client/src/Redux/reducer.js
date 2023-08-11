import { ADD_RECIPE, FILTER_DIETS, FILTER_RECIPES, ORDER } from "./actions";

const initialState = {
  myRecipes: [],
  allRecipes: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        myRecipes: action.payload,
        allRecipes: action.payload,
      };

    case FILTER_DIETS:
      return {};

    case FILTER_RECIPES:
      return {};

    case ORDER:
      return {};

    default:
      return { ...state };
  }
}
