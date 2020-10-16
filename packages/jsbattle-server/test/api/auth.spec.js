"use strict";
const Node = require('../../app/Node.js');
const axios = require('axios');
const { ServiceBroker } = require("moleculer");
const path = require('path');
const PORT = 8771
const BASE_URL = `http://localhost:${PORT}`

describe("Test Auth API", () => {

	describe("Guest", () => {
		let gateway;
		beforeEach(async () => {
			gateway = new Node();
			await gateway.init({
				...(require('../utils/getLoggerSettings.js')(path.resolve(__dirname, '..'), __filename, expect.getState())),
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
			await gateway.waitForApi();
		});

		afterEach(async () => {
			await gateway.stop();
		});

		it('should return all auth methods', async () => {
			let response = await axios.get(`${BASE_URL}/api/authMethods`);
			expect(response.status).toBe(200);
			expect(response.data).toMatchObject({
	      github: { name: 'GitHub', url: 'http://localhost:8080/auth/github' },
	      facebook: { name: 'Facebook', url: 'http://localhost:8080/auth/facebook' },
	      google: { name: 'Google', url: 'http://localhost:8080/auth/google' }
	    })
	  });

		it('should get profile info', async () => {
			let response = await axios.get(`${BASE_URL}/api/profile`);

			expect(response.status).toBe(200);
			expect(response.data).toMatchObject({
				username: 'guest',
				displayName: 'Guest',
				registered: false,
				role: 'guest',
			});

		});

		it('should not register', async () => {

			let response = await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock4',
				displayName: 'Mock 4',
				challenges: [],
				scripts: []
			}, {
				validateStatus: () => true,
			});

			expect(response.status).toBe(401)

		});
	});

	describe("User", () => {
		let gateway;
		let httpConfig = {};
		beforeEach(async () => {
			gateway = new Node();
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
							name: 'mock'
						}
					]
				}
			});
			await gateway.start();
			let authResponse = await axios.get(`${BASE_URL}/auth/mock?format=json`);
			let token = authResponse.data.token;
			httpConfig = {
				headers: {
	      	'Authorization': 'Bearer ' + token
		    }
			}

		});

		afterEach(async () => {
			await gateway.stop();
		});

		it('should get profile info', async () => {
			let response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);

			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
	      username: 'mock',
	      provider: 'mock',
	      registered: false,
	      role: 'user',
	    });
			expect(response.data).toHaveProperty('id');
		});

		it('should register once', async () => {
			let response = await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock5',
				displayName: 'Mock 5',
				role: 'admin', // try to hack it
				challenges: [],
				scripts: []
			}, {
				...httpConfig,
				validateStatus: () => true
			});
			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
				username: 'mock5',
				displayName: 'Mock 5',
				provider: 'mock',
				registered: true,
				role: 'user',
			});
			expect(response.data).toHaveProperty('id');

			response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);

			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
				username: 'mock5',
				displayName: 'Mock 5',
				provider: 'mock',
				registered: true,
				role: 'user',
			});
			expect(response.data).toHaveProperty('id');
		});

		it('should not register twice', async () => {
			let response = await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock6',
				displayName: 'Mock 6',
				role: 'admin', // try to hack it
				challenges: [],
				scripts: []
			}, {
				...httpConfig,
				validateStatus: () => true
			});
			expect(response.status).toBe(200);

			response = await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock7',
				displayName: 'Mock 7',
				role: 'admin', // try to hack it
				challenges: [],
				scripts: []
			}, {
				...httpConfig,
				validateStatus: () => true
			});
			expect(response.status).toBe(422);

			response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);
			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
				username: 'mock6',
				displayName: 'Mock 6',
				provider: 'mock',
				registered: true,
				role: 'user',
			});
			expect(response.data).toHaveProperty('id');
		});

		it('should reject incorrect username', async () => {
			let names = [
				'mock6(*&%',
				'verylonngusernamethatshouldberejected',
				'a',
				'   x   ',
				'jsbattle'
			];
			for(let name of names) {
				let response = await axios.patch(`${BASE_URL}/api/user/initData`, {
					username: name,
					displayName: 'mock',
					challenges: [],
					scripts: []
				}, {
					...httpConfig,
					validateStatus: () => true
				});
				expect(response.status, `Tested value: '${name}'`).toBe(422);

				response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);
				expect(response.status).toBe(200);
				expect(response.data).toMatchObject(   {
					username: 'mock',
				});
			}

		});

		it('should reject incorrect display name', async () => {
			let names = [
				'mock6(*&%',
				'verylonngusernamethatshouldberejected',
				'a',
				'    x   '
			];
			for(let name of names) {
				let response = await axios.patch(`${BASE_URL}/api/user/initData`, {
					username: 'mock',
					displayName: name,
					challenges: [],
					scripts: []
				}, {
					...httpConfig,
					validateStatus: () => true
				});
				expect(response.status, `Tested value: '${name}'`).toBe(422);

				response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);
				expect(response.status).toBe(200);
				expect(response.data).toMatchObject(   {
					username: 'mock',
				});
			}

		});

	});

	describe("Admin", () => {
		let gateway;
		let httpConfig = {};
		beforeEach(async () => {
			gateway = new Node();
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
							name: 'mock'
						}
					],
					admins: [
						{
							provider: 'mock',
							username: 'mock'
						}
					]
				}
			});
			await gateway.start();
			let authResponse = await axios.get(`${BASE_URL}/auth/mock?format=json`);
			let token = authResponse.data.token;
			httpConfig = {
				headers: {
					'Authorization': 'Bearer ' + token
				}
			}

		});

		afterEach(async () => {
			await gateway.stop();
		});

		it('should get profile info', async () => {
			let response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);

			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
				username: 'mock',
				provider: 'mock',
				registered: false,
				role: 'admin',
			});
			expect(response.data).toHaveProperty('id');
		});


		it('should register once', async () => {
			let response = await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock5',
				displayName: 'Mock 5',
				role: 'user', // try to hack it
				challenges: [],
				scripts: []
			}, {
				...httpConfig,
				validateStatus: () => true
			});
			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
				username: 'mock5',
				displayName: 'Mock 5',
				provider: 'mock',
				registered: true,
				role: 'admin',
			});
			expect(response.data).toHaveProperty('id');

			response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);

			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
				username: 'mock5',
				displayName: 'Mock 5',
				provider: 'mock',
				registered: true,
				role: 'admin',
			});
			expect(response.data).toHaveProperty('id');
		});

		it('should not register twice', async () => {
			let response = await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock6',
				displayName: 'Mock 6',
				role: 'user', // try to hack it
				challenges: [],
				scripts: []
			}, {
				...httpConfig,
				validateStatus: () => true
			});
			expect(response.status).toBe(200);

			response = await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock7',
				displayName: 'Mock 7',
				role: 'user', // try to hack it
				challenges: [],
				scripts: []
			}, {
				...httpConfig,
				validateStatus: () => true
			});
			expect(response.status).toBe(422);

			response = await axios.get(`${BASE_URL}/api/profile`, httpConfig);
			expect(response.status).toBe(200);
			expect(response.data).toMatchObject(   {
				username: 'mock6',
				displayName: 'Mock 6',
				provider: 'mock',
				registered: true,
				role: 'admin',
			});
			expect(response.data).toHaveProperty('id');
		});
	});


});
