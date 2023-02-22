import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { TIngredient, TIngredientsState } from './ingredientsTypes';

const initialState: TIngredientsState = {
  isLoading: false,
  ingredientsError: '',
  ingredients: [],
  selectedBun: null,
  selectedIngredients: [],
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsRequest: (state) => {
      state.isLoading = true;
    },
    ingredientsSuccess: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    },
    ingredientsError: (state, action) => {
      state.isLoading = false;
      state.ingredientsError = action.payload;
    },
    addSelectedIngredient: (state, action) => {
      const newIngredient = state.ingredients.find((ingredient) => ingredient._id === action.payload);
      if (newIngredient) {
        state.selectedIngredients = [...state.selectedIngredients, newIngredient];
      }
    },
    addSelectedBun: (state, action) => {
      state.selectedBun = state.ingredients.find((ingredient) => ingredient._id === action.payload) || null;
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = [
        ...state.selectedIngredients.filter((ingredient) => ingredient._id !== action.payload),
      ];
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
});

const { actions, reducer } = ingredientsSlice;

export const {
  ingredientsRequest,
  ingredientsSuccess,
  ingredientsError,
  addSelectedIngredient,
  addSelectedBun,
  removeIngredient,
  sortIngridients,
  clearSelectedIngredients,
} = actions;

export const selectIngredientsOptions = (state: RootState) => state.ingredients;

export default reducer;
