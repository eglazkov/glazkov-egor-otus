import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {weatherReducer} from './weatherReducer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const store = createStore(
    weatherReducer,
    applyMiddleware(thunk)
);

import App from './app';
import ShowWeatherByUrl from './components/showWeatherByUrl';


render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/">
                <App />
            </Route>
            <Route path="/city/:id">                
                <ShowWeatherByUrl />
            </Route>
        </BrowserRouter>        
    </Provider>,
document.getElementById('root'));