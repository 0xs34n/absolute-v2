import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './app/rootReducer.js';
import Routes from './app/Routes.js';

const store = createStore(
	rootReducer, 
	compose(
		applyMiddleware(thunk), 
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

render(
	<Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
);



