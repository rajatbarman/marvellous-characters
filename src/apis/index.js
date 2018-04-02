import request from 'superagent';
const MARVEL_API_HOST = 'https://gateway.marvel.com/';
const MARVEL_API_KEY = '272aa7eadfc76ec989f9ecdb7092d6e3';
const MARVEL_API_PREFIX = 'v1/public/';
const AUTH_API_HOST = 'https://reqres.in/';
const AUTH_API_PREFIX = 'api/';

/* A wrapper on request to set apikey */
const marvelRequest = request.agent()
	.query({
		apikey: MARVEL_API_KEY
	});

export function getCharacters({ name, offset, limit }) {
	return marvelRequest.get(`${MARVEL_API_HOST}${MARVEL_API_PREFIX}characters`)
		.query({ nameStartsWith: name, offset, limit });
}

export function login({ email, password }) {
	return request.post(`${AUTH_API_HOST}${AUTH_API_PREFIX}login/`)
		.send({ email, password });
}

export function register({ email, password }) {
  return request.post(`${AUTH_API_HOST}${AUTH_API_PREFIX}register/`)
    .send({ email, password });
}