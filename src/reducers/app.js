import { handleActions } from 'redux-actions';
import actionTypes from 'actionTypes';
import sessionStorage from 'helpers/sessionStorage';

const defaultState = {
    user: sessionStorage.get('user') || {
        token: ''
    },
};

export default handleActions({
    [actionTypes.APP_SET_USER] (state, { payload, error }) {
        const { user } = payload;

        sessionStorage.set('user', user);

        return {
            ...state,
            user
        };
    },
}, defaultState);
