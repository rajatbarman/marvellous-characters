import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import withCurrentUser from 'shared/withCurrentUser';
import { Route, Redirect } from 'react-router-dom';
import routePaths from 'routePaths';

const AuthRoute = function({ currentUser, ...props }) {
    if (!_.isEmpty(currentUser.token)) {
        return (
            <Redirect to={routePaths.characters} />
        );
    } else {
        return (
            <Route {...props} />
        );
    }
};

AuthRoute.propTypes = {
    currentUser: PropTypes.object,
};

export default withCurrentUser(AuthRoute);

