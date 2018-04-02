import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './IconButton.module.scss';

const IconButton = function({ className, width, height, children, ...props }) {
    return (
        <div style={{ width, height }} className={cx(styles.container, className)} {...props}>
            {children}
        </div>
    );
};

IconButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default IconButton;
