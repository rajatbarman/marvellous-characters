import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Routes from './Routes';
import store from './store';

export default function App() {
	const supportsHistory = 'pushState' in window.history;

	return (
		<Provider store={store}>
			<BrowserRouter forceRefresh={!supportsHistory}>
				<Layout>
					<Routes />
				</Layout>
			</BrowserRouter>
		</Provider>
	)
}