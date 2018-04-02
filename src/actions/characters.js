import { createAction } from 'redux-actions';
import actionTypes from 'actionTypes';

export default {
    setCharacters: createAction(actionTypes.CHARACTERS_SET, function(payload) {
    	return payload;
    })
};

