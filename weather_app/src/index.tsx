import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {weatherReducer} from './weatherReducer';

const store = createStore(
    weatherReducer,
    applyMiddleware(thunk)
);

import App from './app';


render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));