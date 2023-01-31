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
    order: {},
    orderError: ''
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
    addIngredient: (state, action) => {
      state.selectedIngredients = [...state.selectedIngredients, action.payload];
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(ingredient => ingredient.id !== action.payload);
    },
    orderReceived: (state, action) => {
      state.order = action.payload
    },
    orderFailed: (state, action) => {
      state.orderError = action.payload
    },
    removeOrder: (state) => {
      state.order = {};
    },
  },
})

const { actions, reducer } = ingredientsSlice

export const {
  ingredientsLoading, ingredientsFailed, ingredientsReceived,
  addIngredient, removeIngredient,
  orderReceived, orderFailed, removeOrder
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

export const createOrder = (ingredients) => (dispatch) => {
  burgerAPI.createOrder(ingredients).then(orderData => {
    dispatch(orderReceived(orderData));
  }).catch(error => {
    dispatch(orderFailed(error.message));
  });
}

export default reducer
