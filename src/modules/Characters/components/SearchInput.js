import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from 'widgets/Input';
import styles from './SearchInput.module.scss';

export default class SearchInput extends Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		searchInput: PropTypes.string
	};

	constructor(props) {
		super(props);

		this.state = {
			isInputInMiddle: true,
		};
	}

	handleInputChange = ({ value }) => {
		const { onChange } = this.props;

		this.setState({
			isInputInMiddle: false,
		});

		onChange({ value });
	};
    
    render() {
    	const { searchInput } = this.props;
        return (
            <div className={styles.container}>
            	<Input 
            		autoFocus
            		placeholder="Please type something to start searching"
            		className={cx(styles.searchInput, { [styles.lessTop] : !this.state.isInputInMiddle })}
            		onChange={this.handleInputChange}
            		value={searchInput}
            	/>
            </div>
        );
    }
}
