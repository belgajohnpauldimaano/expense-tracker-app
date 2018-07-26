import { createStore, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers/index';

var defaultState = {};

export default (initialState = defaultState) => {
    var store = createStore(rootReducer, initialState, compose (
        applyMiddleware(ReduxThunk)
    ));

    return store;
}