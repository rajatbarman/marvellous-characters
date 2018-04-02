import { handleActions } from 'redux-actions';
import _ from 'lodash';
import actionTypes from 'actionTypes';

const defaultState = {
    characters: [],
};

export default handleActions({
    [actionTypes.CHARACTERS_SET] (state, { payload, error }) {
        const { characters } = payload;

        if (!_.isArray(characters))
            return state;

        return {
            ...state,
            characters
        };
    },
}, defaultState);
