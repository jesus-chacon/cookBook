require('../styles/cookbook.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import App from './components/app';
import reducers from './reducers';

import ApolloClient, { createNetworkInterface, ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj7hw17os0ulx0108whavfg1r' }),
});

const store = createStore(
    combineReducers({
        apollo: client.reducer(),
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

ReactDOM.render(
    <ApolloProvider client={client} store={store}>
        <App />
    </ApolloProvider>
    , document.querySelector('.container'));
