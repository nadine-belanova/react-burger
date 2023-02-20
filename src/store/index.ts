import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredientsSlice';
import orderReducer from './order/orderSlice';
import userReducer from './user/userSlice';

// import { compose, applyMiddleware } from 'redux';
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware());

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer,
  },
});
