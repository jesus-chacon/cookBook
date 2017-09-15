require('../styles/cookbook.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

import ApolloClient, { createNetworkInterface, ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj7hw17os0ulx0108whavfg1r' }),
});

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <ApolloProvider client={client} store={createStoreWithMiddleware(reducers)}>
        <App />
    </ApolloProvider>
    , document.querySelector('.container'));
