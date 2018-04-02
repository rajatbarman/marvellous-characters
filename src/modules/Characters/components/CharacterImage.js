import React from 'react';
import PropTypes from 'prop-types';

function CharacterImage({ image, alt, ...props }) {
	return (
		<img src={`${image.path}.${image.extension}`} alt={alt} {...props} />
	);
}

CharacterImage.propTypes = {
	image: PropTypes.shape({
		path: PropTypes.string.isRequired,
		extension: PropTypes.string.isRequired
	}),
	alt: PropTypes.string
}

export default CharacterImage;