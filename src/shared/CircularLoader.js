import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { CircularLoaderIcon } from 'shared/icons';
import styles from './CircularLoader.module.scss';

const CircularLoader = function({ className, color, width = 20, height = 20 }) {
    const _className = cx(styles.loader, className);

    return (
        <CircularLoaderIcon
            className={_className}
            width={width}
            height={height}
            style={{color}}
        />
    );
};

CircularLoader.propTypes = {
    color: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
};

export default CircularLoader;
