import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {gameReducer, scoreboardReducer} from './Reducers';

const middlewares = [ReduxThunk, promiseMiddleware];

const rootReducer = combineReducers({scoreboardReducer, gameReducer});

export const Store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares)),
);
