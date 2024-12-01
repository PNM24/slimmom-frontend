import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderReducer';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
});

export default store;
