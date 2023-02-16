import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients';
import orderReducer from './slices/order';

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
