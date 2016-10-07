import { combineReducers } from 'redux';
import auth from '../login/reducer'

const rootReducer = combineReducers({
	auth
});

export default rootReducer;