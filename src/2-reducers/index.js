// Importando todos os reducers.

import { combineReducers } from 'redux';
import player from './player';

const mainReducer = combineReducers({ player });

export default mainReducer;
