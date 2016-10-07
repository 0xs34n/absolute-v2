import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { signIn, signOut, signInError } from './actions'

const styles = {
	Card: {
		display: 'block',
		marginTop: 100, 
		height: 310, 
		width: 370, 
		marginLeft: 'auto', 
		marginRight: 'auto'
	},
	CardText: {
		textAlign: 'center'
	},
	Button: {
		width: 256
	}
};

class Login extends Component {
	constructor(props) {
		super(props);
	}

	handleLogin(signIn) {
		console.log(this.email.getValue())
		signIn(this.email.getValue(), this.password.getValue())
	}

	render() {
		return (
			<Card style={styles.Card}>

				{/* Username Input */}
				<CardText style={styles.CardText}>
		 			<TextField 
		 				floatingLabelText="Email" 
		 				ref={ref => { this.email = ref }}
		 			/>
	    		</CardText>

	    		{/* Password Input */}
	    		<CardText style={styles.CardText}>
		    		<TextField 
		    			floatingLabelText="Password" 
		    			type="password" 
		    			ref={ref => { this.password = ref }}
		    		/>
	    		</CardText>

	    		<CardText style={styles.CardText}>

	    			{/* Login Button */}
	    			<RaisedButton 
	    				label="Login" 
	    				primary={true} 
	    				style={styles.Button}
	    				onClick={() => this.handleLogin(this.props.signIn)}
	    			/>

	    			{/* Error Dialog */}
		    		<Dialog
		    			actions={<FlatButton label="Ok" primary={true} onTouchTap={this.props.signInError}/>}
	          			modal={false}
	          			open={this.props.error === null ? false : true}
	          			onRequestClose={this.props.signInError}
	        		>
	          			{this.props.error ? this.props.error.toString() : ''}
	        		</Dialog>
	    		</CardText>
			</Card>
		)
	}
}

function mapStateToProps(state) {
	return { 
	    authenticated: state.auth.authenticated,
	    user: state.auth.user,
	    error: state.auth.error,
	    inProgress: state.auth.inProgress
	};
};

function mapDispatchToProps(dispatch) {
	return {
		signIn: (email, password) => dispatch(signIn(email, password)),
		signInError: () => dispatch(signInError(null))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);