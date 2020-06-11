"use strict";

const ConfigBroker = require("../../../app/lib/ConfigBroker.js");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;

describe("Test 'Queue' service", () => {
	let broker;

	beforeEach(async () => {
		broker = new ConfigBroker({ logger: false }, {}, false);
		await broker.loadService(__dirname + "../../../../app/services/Queue.service.js");
		await broker.start()
	});
	afterEach(async () => await broker.stop());

	it('should add messages to default topics', async () => {
		let result;

		result = await broker.call('queue.write', { payload: {foo4: 'bar1'} } );
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 1);
		result = await broker.call('queue.write', { payload: {foo4: 'bar2'} } );
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 2);

		result = await broker.call('queue.read');
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('payload');
		expect(result.payload).toHaveProperty('foo4', 'bar1');
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 1);

		result = await broker.call('queue.read');
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('payload');
		expect(result.payload).toHaveProperty('foo4', 'bar2');
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 0);

		result = await broker.call('queue.read');
		expect(result).toHaveProperty('ok', false);
		expect(result).toHaveProperty('payload', null);
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 0);
	});

	it('should add messages to custom topics', async () => {
		let result;

		result = await broker.call('queue.write', { payload: {foo4: 'bar0'}, topic: 'another_custom83' } );
		result = await broker.call('queue.write', { payload: {foo4: 'bar1'}, topic: 'custom6' } );
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('topic', 'custom6');
		expect(result).toHaveProperty('queueLength', 1);
		result = await broker.call('queue.write', { payload: {foo4: 'bar2'}, topic: 'custom6' } );
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('topic', 'custom6');
		expect(result).toHaveProperty('queueLength', 2);

		result = await broker.call('queue.read');
		expect(result).toHaveProperty('ok', false);
		expect(result).toHaveProperty('payload', null);
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 0);

		result = await broker.call('queue.read', {topic: 'custom6'});
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('payload');
		expect(result.payload).toHaveProperty('foo4', 'bar1');
		expect(result).toHaveProperty('topic', 'custom6');
		expect(result).toHaveProperty('queueLength', 1);

		result = await broker.call('queue.read', {topic: 'custom6'});
		expect(result).toHaveProperty('ok', true);
		expect(result).toHaveProperty('payload');
		expect(result.payload).toHaveProperty('foo4', 'bar2');
		expect(result).toHaveProperty('topic', 'custom6');
		expect(result).toHaveProperty('queueLength', 0);

		result = await broker.call('queue.read', {topic: 'custom6'});
		expect(result).toHaveProperty('ok', false);
		expect(result).toHaveProperty('payload', null);
		expect(result).toHaveProperty('topic', 'custom6');
		expect(result).toHaveProperty('queueLength', 0);
	});

	it('should not throw error when topic does not exist', async () => {
		let result = await broker.call('queue.read', {topic: 'nothingthere435'});
		expect(result).toHaveProperty('ok', false);
		expect(result).toHaveProperty('payload', null);
		expect(result).toHaveProperty('topic', 'nothingthere435');
		expect(result).toHaveProperty('queueLength', 0);
	});

	it('should not add above hard limit', async () => {
		let result;
		for(let i=0; i < 100; i++) {
			result = await broker.call('queue.write', {payload: {i}});
			expect(result).toHaveProperty('ok', true);
		}

		result = await broker.call('queue.write', { payload: {foo7: 'bar92'} } );
		expect(result).toHaveProperty('ok', false);
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 100);

	});

	it('should not add above requested limit', async () => {
		let result;
		for(let i=0; i < 5; i++) {
			result = await broker.call('queue.write', {payload: {i}, limit: 5});
			expect(result).toHaveProperty('ok', true);
		}

		result = await broker.call('queue.write', { payload: {foo7: 'bar92'}, limit: 5 } );
		expect(result).toHaveProperty('ok', false);
		expect(result).toHaveProperty('topic', 'default');
		expect(result).toHaveProperty('queueLength', 5);

	});

});
