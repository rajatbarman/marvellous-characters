import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ExitIcon } from 'shared/icons';
import IconButton from 'shared/IconButton';
import styles from './Header.module.scss';

function Header({ onLogoutClick }) {
	return (
	    <div className={styles.container}>
	    	<IconButton onClick={onLogoutClick} data-hint="Enough nerdy stuff for today" width={30} height={30} className={cx(styles.logoutButton, 'hint hint--left')}>
	    		<ExitIcon width={15} height={15} />
	    	</IconButton>
	    </div>
	);
}

Header.propTypes = {
	onLogoutClick: PropTypes.func,
}

export default Header;
