import {
  GET_RECIPES,
  ADD_RECIPE,
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
        myRecipes: [...state.myRecipes, ...action.payload],
        allRecipes: [...state.myRecipes, ...action.payload],
      };

    default:
      return { ...state };
  }
}
