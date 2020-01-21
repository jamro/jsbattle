"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;

describe("Test 'Auth' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.serviceConfig = {};
	broker.loadService(__dirname + "../../../app/services/Auth.service.js");

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

  it('should create JWT token', async () => {
		let response = await broker.call("auth.authorize", {user: {username: "amy", role: "user"}});
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
