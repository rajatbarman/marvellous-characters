import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routePaths from './routePaths';
import AuthRoute from 'shared/AuthRoute';
import PrivateRoute from 'shared/PrivateRoute';

import Characters from 'modules/Characters';
import Login from 'modules/Login';
import Register from 'modules/Register';

const Routes = function() {
    return (
        <Switch>
            <Route exact path="/" component={() => {
                return <Redirect to={routePaths.login} />
            }} />
            <AuthRoute exact path={routePaths.login} component={Login} />
            <AuthRoute exact path={routePaths.register} component={Register} />
            <PrivateRoute exact path={routePaths.characters} component={Characters} />
            <Route path="*" component={() => {
                return <h1>404 - Route does not exist.</h1>
            }} />
        </Switch>
    )
};

export default Routes;
