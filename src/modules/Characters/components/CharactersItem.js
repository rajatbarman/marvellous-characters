import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CharacterImage from './CharacterImage';
import styles from './CharactersItem.module.scss';

export default class CharactersItem extends Component {
	static propTypes = {
		character: PropTypes.object.isRequired,
        onClick: PropTypes.func,
	};

    handleClick = () => {
        const { character, onClick } = this.props;

        onClick && onClick(character);
    };
    
    render() {
    	const { character } = this.props;
        return (
            <div className={styles.container} onClick={this.handleClick}>
                <div className={styles.imageContainer}>
                    <CharacterImage image={character.thumbnail} />
                </div>
            	<div className={styles.characterName}>{character.name}</div>
            </div>
        );
    }
}
