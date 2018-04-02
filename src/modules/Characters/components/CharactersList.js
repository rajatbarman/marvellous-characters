import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import CharactersItem from './CharactersItem';
import CircularLoader from 'shared/CircularLoader';
import styles from './CharactersList.module.scss';

function CharactersList({ totalCharacters, characters,  isFetchingData,  searchInput,  onCharacterSelected }) {
	const isZeroCase = !_.size(characters) && searchInput;

	return (
		<div className={cx(styles.container, { [styles.centered] : isFetchingData || isZeroCase })}>
			{
				isFetchingData ? (
					<CircularLoader />
				) : isZeroCase ? (
					<div className={styles.zeroCase}>
						No results found matching "{searchInput}".
					</div>
				) : (
					<Fragment>
						{
							totalCharacters > 0 ? (
								<p className={styles.totalCharacters}>
									{totalCharacters} characters found!
								</p>
							) : null
						}
						<div className={styles.content}>
							{
								_.map(characters, character => (
										<CharactersItem
											character={character}
											key={character.id}
											onClick={onCharacterSelected}
										/>
								))
							}
						</div>
					</Fragment>
				)
			}
		</div>
	);
}

CharactersList.propTypes = {
	characters: PropTypes.array,
	isFetchingData: PropTypes.bool,
	searchInput: PropTypes.string,
	onCharacterSelected: PropTypes.func,
	totalCharacters: PropTypes.number
};

export default CharactersList;