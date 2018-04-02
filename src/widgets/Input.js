import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Input.module.scss';

export default class Input extends Component {
    static propTypes = {
        /* A unique identifier for this input */
        name: PropTypes.string,

        type: PropTypes.oneOf(['text', 'number', 'password', 'file', 'date']),

        label: PropTypes.string,

        placeholder: PropTypes.string,

        readOnly: PropTypes.bool,

        onChange: PropTypes.func,

        /* Will be applied to container */
        className: PropTypes.string,

        /* Will be applied to label */
        labelClassName: PropTypes.string,

        /* Will be applied to error */
        errorClassName: PropTypes.string,

        /* Value */
        value: PropTypes.string,

        /* Error message */
        error: PropTypes.string,

    };

    handleKeyPress = event => {
        const { name, onEnter, value } = this.props;

        if(event.key === 'Enter') {
            onEnter && onEnter({
                name,
                event,
                value,
            });
        }
    };

    handleChange = event => {
        const value = event.target.value;
        const { name, onChange } = this.props;
        onChange && onChange({ value, name, event });
    };

    render() {
        const {
            type,
            label,
            className,
            labelClassName,
            errorClassName,
            onChange,
            onEnter,
            error,
            ...props
        } = this.props;

        const _className = cx(
            className,
            styles.input,
            {
                [styles.hasError]: error,
            }
        );

        const _labelClassName = cx(styles.label, labelClassName);
        const _errorClassName = cx(styles.error, errorClassName);

        return (
            <Fragment>
                {
                    label ? (
                        <label className={_labelClassName}>
                            {label}
                        </label>
                    ) : null
                }

                <input
                    {...props}
                    type={type}
                    onKeyPress={this.handleKeyPress}
                    className={_className}
                    onChange={this.handleChange}
                />

                {
                    error ? (
                        <span className={_errorClassName}>{error}</span>
                    ) : null
                }
            </Fragment>
        );
    }
}
