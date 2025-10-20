import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  feedSlice,
  orderSlice,
  ingredientSlice,
  userSlice,
  constructorSlice
} from '@slices';

const rootReducer = combineReducers({
  feed: feedSlice.reducer,
  order: orderSlice.reducer,
  ingredients: ingredientSlice.reducer,
  user: userSlice.reducer,
  burgerConstructor: constructorSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
