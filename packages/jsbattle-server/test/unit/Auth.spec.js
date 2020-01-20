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

  it('should login', async () => {
		let response = await broker.call("auth.login", {username: "admin", password: "secret"});
		let token = response.token;
		expect(token).toBeDefined();
		response = await broker.call("auth.resolveToken", {token});
		expect(response).toBeDefined();
		expect(response.username).toBe('admin');

  });

	it('should throw an error when incorrect credentials', async () => {
		expect(
			broker.call("auth.login", {username: "hacker", password: "2345djkfaasdfcljiwencioasnca"})
		).rejects.toThrow(ValidationError)
	});

	it('should throw an error when missing login parameters', async () => {
		expect(
			broker.call("auth.login", {username: "admin"})
		).rejects.toThrow(ValidationError)
		expect(
			broker.call("auth.login", {password: "secret"})
		).rejects.toThrow(ValidationError)
	});

});
