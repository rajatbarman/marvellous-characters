import { createAction } from 'redux-actions';
import actionTypes from 'actionTypes';

export default {
    setUser: createAction(actionTypes.APP_SET_USER, function(payload) {
    	return payload;
    })
};

