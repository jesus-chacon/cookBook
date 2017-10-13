require('../styles/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';

import ApolloClient, { createNetworkInterface, ApolloProvider } from 'react-apollo'

import backgroundReducer from './reducers/background';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj7hw17os0ulx0108whavfg1r' }),
});

const store = createStore(
    combineReducers({
        apollo: client.reducer(),
        backgroundReducer
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ),
    applyMiddleware(promise)
);

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client} store={store}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.querySelector('#app'));
