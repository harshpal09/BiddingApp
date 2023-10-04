// configureStore.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // If you need middleware
import booleanReducer from '../Reducers/booleanReducer';
import objectReducer from '../Reducers/objectReducer';
import arrayReducer from '../Reducers/arrayReducer';

const rootReducer = combineReducers({
  booleanState: booleanReducer,
  objectState: objectReducer,
  arrayState: arrayReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
