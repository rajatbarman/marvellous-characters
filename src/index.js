import React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line
import styles from 'sass/index.scss';
import App from './App';
require('sass/trumps/index.scss');

render(<App />, document.getElementById('root'));
