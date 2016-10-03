import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'redux-react-firebase';

const combinedReducer = combineReducers({
	firebase: firebaseStateReducer
});

export default combinedReducer;