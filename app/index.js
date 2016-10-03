import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { reduxReactFirebase } from 'redux-react-firebase';

import combinedReducer from './main/combinedReducer.js';
import Routes from './main/Routes.js';

const firebaseConfig = {
	apiKey: 'AIzaSyDSoYt1Ir2pSs60q7W2hvQ3WGw6MjbDtok',
	authDomain: 'absolute-1b139.firebaseapp.com',
	databaseURL: 'https://absolute-1b139.firebaseio.com',
	storageBucket: 'absolute-1b139.appspot.com'
};

const createStoreWithFirebase = compose(
    reduxReactFirebase(firebaseConfig),
    window.devToolsExtension ? window.devToolsExtension() : f => f 
)(createStore);

const store = createStoreWithFirebase(combinedReducer);

render(
	<Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
);
