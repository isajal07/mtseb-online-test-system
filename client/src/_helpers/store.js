import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();
const composeEnhancer =  compose;

export const store = createStore(
    rootReducer,
    composeEnhancer(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ))
);