import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import orderReducer from './orderSlice';

import { compose, applyMiddleware } from 'redux';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware());

export default configureStore(
  {
    reducer: {
      ingredients: ingredientsReducer,
      order: orderReducer,
    },
  },
  enhancer
);
