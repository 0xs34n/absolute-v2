import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

function Routes(props) {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App} />
		</Router>
	);
};

export default Routes;