import { createStore, combineReducers } from 'redux';
import { CategoriesRx } from './Reduxers/CategoriesRx';
import { ProductsRx } from './Reduxers/ProductsRx';
import { ShoppingCarRx } from './Reduxers/ShoppingCarRx';

const reduxers = combineReducers({ CategoriesRx, ProductsRx, ShoppingCarRx });

const store = createStore(reduxers);

export { store };
