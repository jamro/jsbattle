"use strict";

const ConfigBroker = require("../../app/lib/ConfigBroker.js");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;

const createTestUser = () => ({
	id: "123456",
	username: "amy",
	role: "user"
})

const createTestToken = () => ({
	id: "123456",
	username: "amy",
	role: "user"
})

describe("Test 'Auth' service", () => {
	let config = {
		auth: {
			providers: [
				{
					name: 'github',
					clientID: 'XXXYYYZZZ',
					clientSecret: 'XXXYYYZZZ'
				}
			]
		}
	}
	let broker = new ConfigBroker({ logger: false }, config, false);
	broker.loadService(__dirname + "../../../app/services/auth/index.js");
	broker.createService({
		name: "userStore",
    actions: {
      get: (ctx) => createTestUser()
    }
	});

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	it('should return guest profile if not authorized', async () => {
		let response = await broker.call("auth.whoami", {});
		expect(response).toBeDefined();
		expect(response.username).toBeDefined();
		expect(response.role).toBe('guest');
		expect(response.id).toBeUndefined();
  });

	it('should return user profile', async () => {
		let response = await broker.call("auth.whoami", {}, {meta: {user: createTestToken()}});
		expect(response).toBeDefined();
		expect(response.username).toBe('amy');
		expect(response.role).toBe('user');
		expect(response.id).toBeDefined();
	});

	it ('should return authMethods', async () => {
		let response = await broker.call("auth.getAuthMethods", {});
		expect(response).toBeDefined();
		expect(response.github).toBeDefined();
		expect(response.github.name).toBe('GitHub');
		expect(response.github.url).toMatch(/\/auth\/github$/);
		expect(response.clientID).toBeUndefined();
		expect(response.clientSecret).toBeUndefined();
	});

  it('should create JWT token', async () => {
		let response = await broker.call("auth.authorize", {user: createTestToken()});
		expect(response).toBeDefined();
		expect(response.token).toBeDefined();
		let token = response.token;

		response = await broker.call("auth.resolveToken", {token});
		expect(response).toBeDefined();
		expect(response.username).toBe('amy');
		expect(response.role).toBe('user');
  });

	it('should throw an error when user is missing for authorize call', async () => {
		expect(
			broker.call("auth.authorize", {})
		).rejects.toThrow(ValidationError)
	});

	it('should throw an error when token is missing for resolveToken call', async () => {
		expect(
			broker.call("auth.resolveToken", {})
		).rejects.toThrow(ValidationError)
	});

});
