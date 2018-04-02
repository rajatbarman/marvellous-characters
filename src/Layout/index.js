import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import appActions from 'actions/app';
import charactersActions from 'actions/characters';
import { connect } from 'react-redux';
import routePaths from 'routePaths';
import Header from './Header';

class MainLayout extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

    handleLogout = () => {
        const { actions, history } = this.props;
        actions.setUser({ user: {} });
        actions.setCharacters({ characters: [] });
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
        actions: bindActionCreators({ ...appActions, ...charactersActions }, dispatch)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout));
