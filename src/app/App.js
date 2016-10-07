import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from '../login/Login';

function App (props) {
	return (
		<MuiThemeProvider>
			<Login />
		</MuiThemeProvider>
	);
};

export default App;