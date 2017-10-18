require('../styles/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient, { createNetworkInterface, ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import App from './components/app';

import backgroundReducer from './reducers/background';
import sessionReducer from './reducers/session';

import { GC_AUTH_TOKEN } from "./components/constants";

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj7hw17os0ulx0108whavfg1r' });

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj7hw17os0ulx0108whavfg1r',{
    reconnect: true,
    connectionParams: {
        authToken: localStorage.getItem(GC_AUTH_TOKEN),
    }
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {}
        }
        const token = localStorage.getItem(GC_AUTH_TOKEN);
        req.options.headers.authorization = token ? `Bearer ${token}` : null;
        next();
    }
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
});

const store = createStore(
    combineReducers({
        apollo: client.reducer(),
        backgroundReducer,
        sessionReducer
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
