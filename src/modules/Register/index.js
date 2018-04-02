import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import appActions from 'actions/app';
import Input from 'widgets/Input';
import Button from 'widgets/Button';
import routePaths from 'routePaths';
import { register } from 'apis';
import styles from 'modules/Login/index.module.scss';

class Register extends Component {
    constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: '',
			isSubmitting: false,
		};
	}

	handleInputChange = ({ name, value }) => {
		this.setState({ [name] : value, error: '' });
	};

	handleInputEnter = () => {
		this.handleSubmit();
	};

	handleSubmit = () => {
		const { actions, history } = this.props;
		const { email, password } = this.state;

		if (!email || !password) {
			this.setState({ error: 'Required fields left blank.' });
			return;
		}

        this.setState({ isSubmitting: true });
        
        register({ email, password })
            .then(({ body }) => {
                this.setState({ isSubmitting: false });
                return actions.setUser({ user: body });
            }, ({ response }) => {
                this.setState({ isSubmitting: false, error: _.get(response ,'body.error') });
                return Promise.reject();
            })
            .then(() => {
                history.replace(routePaths.characters);
            });
	}
    
    render() {
        return (
            <div className={styles.container}>
            	<h1>Register</h1>
            	<Input 
            		autoFocus
            		name="email"
            		label="Email"
            		value={this.state.email}
            		onChange={this.handleInputChange}
            		onEnter={this.handleInputEnter}
            	/>
            	<Input 
            		name="password"
            		label="Password"
            		type="password"
            		className={styles.passwordInput}
            		value={this.state.password}
            		onChange={this.handleInputChange}
            		onEnter={this.handleInputEnter}
            	/>
            	{
            	    this.state.error ? (
            	        <span className={styles.error}>{this.state.error}</span>
            	    ) : null
            	}
            	<Button
            		loading={this.state.isSubmitting} 
            		label="Register"
            		className={styles.button}
            		onClick={this.handleSubmit}
            	/>

                <Link to={routePaths.login} className={styles.link}>Already registered? Login here.</Link>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appActions, dispatch)
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Register);