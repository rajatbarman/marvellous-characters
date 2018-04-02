import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import CharacterImage from './CharacterImage';
import { CrossIcon } from 'shared/icons';
import IconButton from 'shared/IconButton';
import styles from './CharacterDetails.module.scss';

export default class CharacterDetails extends Component {
	static propTypes = {
		character: PropTypes.object,
        onClose: PropTypes.func
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.character !== nextProps.character) {
			this.resetScroll();
		}
	}

	resetScroll = () => {
		if (this.contentNode) {
			this.contentNode.scrollTop = 0;
		}
	};
    
    render() {
    	const { character, onClose } = this.props;

        const isOpen = _.isEmpty(character) ? false : true;

    	const anchorTypeToTitleMap = {
    		detail: 'Details',
    		comiclink: 'Comic link',
    		wiki: 'Wiki'
    	};

        const contentNode = isOpen ? (
                <div className={styles.content} ref={(ref) => this.contentNode = ref}>
                    <div className={styles.imageContainer}>
                        <CharacterImage key={character.id} image={character.thumbnail} alt={character.name} />
                    </div>
                    <p className={styles.characterName}>{character.name}</p>
                    <div className={styles.descContainer}>
                        <div className={styles.descriptionText}>
                            Description
                        </div>
                        <div className={styles.anchors}>
                            {
                                _.map(character.urls, (url, index) => {
                                    const anchorTitle = anchorTypeToTitleMap[url.type] || _.capitalize(url.type);
                                    return (
                                        <a key={index} target="_blank" className={styles.anchor} href={url.url} title={anchorTitle}>
                                            {anchorTitle}
                                        </a>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
        ) : null;

        return (
            <div className={cx(styles.container, { [styles.open] : isOpen })}>
                <IconButton onClick={onClose} width={30} height={30} className={styles.closeButton}>
                    <CrossIcon width={10} height={10} />
                </IconButton>
            	{contentNode}
            </div>
        );
    }
}
