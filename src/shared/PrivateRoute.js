import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import withCurrentUser from 'shared/withCurrentUser';
import { Route, Redirect } from 'react-router-dom';
import routePaths from 'routePaths';

const PrivateRoute = function({ currentUser, ...props }) {
    if (!_.isEmpty(currentUser.token)) {
        return (
            <Route {...props} />
        );
    } else {
        return (
            <Redirect to={routePaths.login} />
        );
    }
};

PrivateRoute.propTypes = {
    currentUser: PropTypes.object,
};

export default withCurrentUser(PrivateRoute);