"use strict";
const Gateway = require('../../app/Gateway.js');
const axios = require('axios');

const PORT = 8771
const BASE_URL = `http://localhost:${PORT}`

describe("Test Share Battle API", () => {

	let gateway;

	beforeAll(async () => {
		gateway = new Gateway();
		await gateway.init({
			loglevel: 'none',
			skipEnv: true,
			web: {
				port: PORT,
				corsOrigin: ["*"]
			},
			auth: {
				providers: [
					{
						name: 'github',
						clientID: 'XXXYYYZZZ',
						clientSecret: 'XXXYYYZZZ'
					},
					{
						name: 'facebook',
						clientID: 'XXXYYYZZZ',
						clientSecret: 'XXXYYYZZZ'
					},
					{
						name: 'google',
						clientID: 'XXXYYYZZZ',
						clientSecret: 'XXXYYYZZZ'
					}
				]
			}
		});
		await gateway.start();
	});

	afterAll(async () => {
		await gateway.stop();
	});

	it('should return all auth methods', async () => {
		/*
		let response = await axios.get(`${BASE_URL}/api/authMethods`);
		expect(response.status).toBe(200);
		expect(response.data).toBeDefined();
		expect(response.data.github).toBeDefined();
		expect(response.data.facebook).toBeDefined();
		expect(response.data.google.name).toBe('Google');
		expect(response.data.github.name).toBe('GitHub');
		expect(response.data.facebook.name).toBe('Facebook');
		expect(response.data.google.url).toBe('http://localhost:8080/auth/google');
		expect(response.data.github.url).toBe('http://localhost:8080/auth/github');
		expect(response.data.facebook.url).toBe('http://localhost:8080/auth/facebook');
		expect(response.data.google).toBeDefined();
		*/
  });


});
