"use strict";

const serviceConfig = require('../../../app/lib/serviceConfig.js');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;

describe("Test 'ActivityMonitor' service", () => {
	let broker;

	beforeEach(async () => {
		broker = new ServiceBroker({ logger: false });
		const schemaBuilder = require(__dirname + "../../../../app/services/activityMonitor/index.js");
		await broker.createService(schemaBuilder(serviceConfig.data));
		await broker.start()
	});
	afterEach(async () => await broker.stop());

	it('should has no session at startup', async () => {
		let result = await broker.call('activityMonitor.listActiveSessions', {});
		expect(result).toHaveLength(0)
	});

	it('should store user activity', async () => {
		await broker.emit("user.activity", {
			action: 'some.action873',
			timestamp: new Date(),
			userId: 19873,
			username: 'alfred',
			role: 'admin',
			uri: '/api345'
		});
		await broker.emit("user.activity", {
			action: 'anotoher.action483',
			timestamp: new Date(),
			userId: 99584,
			username: 'geff',
			role: 'guest',
			uri: '/api456'
		});
		await broker.emit("user.activity", {
			action: 'last.action6453',
			timestamp: new Date(),
			userId: 19873,
			username: 'alfred',
			role: 'admin',
			uri: '/api875'
		});

		let result = await broker.call('activityMonitor.listActiveSessions', {});
		expect(result).toHaveLength(2)
		expect(result[0]).toHaveProperty('userId', 19873);
		expect(result[0]).toHaveProperty('username', 'alfred');
		expect(result[0]).toHaveProperty('role', 'admin');
		expect(result[0]).toHaveProperty('lastAction');
		expect(result[0].lastAction).toHaveProperty('service', 'last.action6453');
		expect(result[0].lastAction).toHaveProperty('uri', '/api875');
		expect(result[0].lastAction).toHaveProperty('timestamp');

		expect(result[1]).toHaveProperty('userId', 99584);
		expect(result[1]).toHaveProperty('username', 'geff');
		expect(result[1]).toHaveProperty('role', 'guest');
		expect(result[1]).toHaveProperty('lastAction');
		expect(result[1].lastAction).toHaveProperty('service', 'anotoher.action483');
		expect(result[1].lastAction).toHaveProperty('uri', '/api456');
		expect(result[1].lastAction).toHaveProperty('timestamp');
	});



});
