import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Main from './Main';

function Routes(props) {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={Main} />
		</Router>
	);
};

export default Routes;