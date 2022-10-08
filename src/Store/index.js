import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers/index';

let store;

export function configureStore(){
    store = createStore(reducer , applyMiddleware(thunk));
    return store;
}