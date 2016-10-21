import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* Populated by react-webpack-redux:reducer */

import counter from './counter';

const reducers = {
    routing: routerReducer,
    counter: counter
};
module.exports = combineReducers(reducers);