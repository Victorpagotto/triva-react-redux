// Store.

import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import mainReducer from '../2-reducers';

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
