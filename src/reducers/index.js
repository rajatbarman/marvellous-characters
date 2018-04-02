import { combineReducers } from 'redux';
import app from 'reducers/app';
import characters from 'reducers/characters';

export default combineReducers({
	app,
	characters
});
