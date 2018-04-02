import _ from 'lodash';
import { login } from 'apis';

const acceptableLogins = [
	{
		email: 'user@mc.com',
		password: '123456'
	},
	{
		email: 'user1@mc.com',
		password: '123456'
	}
];

export default function mockAuthentication({ email, password }) {
	return new Promise((resolve, reject) => {
		login({ email, password })
			.then(response => {
				let isAuthValid = false;
				_.each(acceptableLogins, acceptableLogin => {
					if (email === acceptableLogin.email && password === acceptableLogin.password) {
						isAuthValid = true;
						return false;
					}
				});

				if (isAuthValid) {
					resolve({ email });
				} else {
					reject({ error: 'Invalid username/password combination' });	
				}
			}, reject);
	});
}