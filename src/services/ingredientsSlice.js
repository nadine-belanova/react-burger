import { createSlice } from '@reduxjs/toolkit'

import burgerAPI from '../utils/burger-api'

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    isLoading: false,
    ingredientsError: '',
    ingredients: [],
    selectedIngredients: [],
    currentIngredient: null,
    order: {}
  },
  reducers: {
    ingredientsLoading: (state) => {
      state.isLoading = true;
    },
    ingredientsError: (state, action) => {
      state.isLoading = false;
      state.ingredientsError = action.payload;
    },
    ingredientsReceived: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload
    },
    addIngredient: (state, action) => {
      state.selectedIngredients = [...state.selectedIngredients, action.payload];
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(ingredient => ingredient.id !== action.payload);
    },
  },
})

const { actions, reducer } = ingredientsSlice

export const { ingredientsLoading, ingredientsError, ingredientsReceived, addIngredient, removeIngredient } = actions

export const selectIngredientsOptions = (state) => state.ingredients;

export const fetchIngredients = () => (dispatch) => {
  dispatch(ingredientsLoading());
  burgerAPI.fetchIngredients().then(resultData => {
    dispatch(ingredientsReceived(resultData));
  }).catch(error => {
    dispatch(ingredientsError(error.message));
  });
}

export default reducer
