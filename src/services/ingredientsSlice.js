import { createSlice } from '@reduxjs/toolkit'

import burgerAPI from '../utils/burger-api'

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    isLoading: false,
    ingredientsError: '',
    ingredients: [],
    selectedBun: null,
    selectedIngredients: [],
  },
  reducers: {
    ingredientsLoading: (state) => {
      state.isLoading = true;
    },
    ingredientsFailed: (state, action) => {
      state.isLoading = false;
      state.ingredientsError = action.payload;
    },
    ingredientsReceived: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload
    },
    addSelectedIngredient: (state, action) => {
      const newIngredient = state.ingredients.find(ingredient => ingredient._id === action.payload);
      state.selectedIngredients = [...state.selectedIngredients, newIngredient];
    },
    addSelectedBun: (state, action) => {
      state.selectedBun = state.ingredients.find(ingredient => ingredient._id === action.payload);
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = [...state.selectedIngredients.filter(ingredient => ingredient._id !== action.payload)];
    },
    sortIngridients: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const newSelectedIngredients = [...state.selectedIngredients];
      const fromItem = newSelectedIngredients[fromIndex];
      newSelectedIngredients.splice(fromIndex, 1);
      newSelectedIngredients.splice(toIndex, 0, fromItem);
      state.selectedIngredients = newSelectedIngredients;
    },
    clearSelectedIngredients: (state) => {
      state.selectedIngredients = [];
      state.selectedBun = null;
    },
  },
})

const { actions, reducer } = ingredientsSlice

export const {
  ingredientsLoading, ingredientsFailed, ingredientsReceived,
  addSelectedIngredient, addSelectedBun, removeIngredient, sortIngridients, clearSelectedIngredients
} = actions

export const selectIngredientsOptions = (state) => state.ingredients;

export const fetchIngredients = () => (dispatch) => {
  dispatch(ingredientsLoading());
  burgerAPI.fetchIngredients().then(resultData => {
    dispatch(ingredientsReceived(resultData));
  }).catch(error => {
    dispatch(ingredientsFailed(error.message));
  });
}

export default reducer
