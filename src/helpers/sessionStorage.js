/* Using store2 for safe json parse and stringify operations */
import store from 'store2';

export default {
	get(key) {
		return store.session(key);
	},

	set(key, value) {
		store.session(key, value);
	}
}