import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import appActions from 'actions/app';
import { connect } from 'react-redux';
import Login from 'modules/Login';
import routePaths from 'routePaths';
import Characters from 'modules/Characters';
import Header from './Header';

class MainLayout extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

    handleLogout = () => {
        const { actions, history } = this.props;
        actions.setUser({ user: {} });
        history.replace(routePaths.login);
    };
    
    render() {
    	const { user } = this.props;

        const isUserLoggedIn = !_.isEmpty(user.token);

        return (
            <div>
                { isUserLoggedIn ? <Header onLogoutClick={this.handleLogout} /> : null }
            	{this.props.children}
            </div>
        );
    }
}

function mapStateToProps({ app }) {
    return {
    	user: app.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appActions, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout));
