import React, { Component } from 'react';
import PropTypes from 'prop-types';

function CharacterImage({ image, ...props }) {
	return (
		<img src={`${image.path}.${image.extension}`} {...props} />
	);
}

CharacterImage.propTypes = {
	image: PropTypes.shape({
		path: PropTypes.string.isRequired,
		extension: PropTypes.string.isRequired
	})
}

export default CharacterImage;