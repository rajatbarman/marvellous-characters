import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Paginate.module.scss';

export default class Paginate extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		offset: PropTypes.number,
		limit: PropTypes.number,
		total: PropTypes.number,
		count: PropTypes.number
	};

	handlePrevClick = () => {
		const { onChange, offset, limit } = this.props;
		onChange({ offset: offset - limit });
	};

	handleNextClick = () => {
		const { onChange, offset, limit } = this.props;
		onChange({ offset: offset + limit });
	};
    
    render() {
    	const { offset, limit, total, count } = this.props;

    	if (total <= limit)
    		return null;

    	const isFirstPage = offset < count;

    	const isLastPage = count < limit;

        return (
            <div className={styles.container}>
            	{
            		!isFirstPage ? (
            			<div onClick={this.handlePrevClick} className={styles.btn}>Prev</div>
            		) : null
            	}
            	{
            		!isLastPage ? (
            			<div onClick={this.handleNextClick} className={styles.btn}>Next</div>
            		) : null
            	}
            </div>
        );
    }
}
