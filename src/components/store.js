import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Corectarea importului
import loaderReducer from './reducers/loaderReducer';

const rootReducer = combineReducers({
  loader: loaderReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;