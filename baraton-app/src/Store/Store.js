import { createStore, combineReducers } from 'redux';
import { CategoriesRx } from './Reduxers/CategoriesRx';
import { ProductsRx } from './Reduxers/ProductsRx';

const reduxers = combineReducers({ CategoriesRx, ProductsRx });

const store = createStore(reduxers);

export { store };
