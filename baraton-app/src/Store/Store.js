import { createStore, combineReducers } from 'redux';
import { CategoriesRx } from './Reduxers/CategoriesRx';

const reduxers = combineReducers({ CategoriesRx });

const store = createStore(reduxers);

export { store };
