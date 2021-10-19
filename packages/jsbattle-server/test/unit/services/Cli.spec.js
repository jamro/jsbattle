"use strict";

const serviceConfig = require('../../../app/lib/serviceConfig.js');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const path = require('path');

const dataServices = [
  'battleStore',
  'challenges',
  'league',
  'scriptStore',
  'userStore'
]

describe("Test 'CLI' service", () => {
	let broker;
	let createMock;
	let removeMock;

	beforeEach(async () => {
		broker = new ServiceBroker(require('../../utils/getLoggerSettings.js')(path.resolve(__dirname, '..', '..'), __filename, expect.getState()));
		const schemaBuilder = require(__dirname + "../../../../app/services/cli/index.js");
		await broker.createService(schemaBuilder(serviceConfig.data));
		await broker.start()

		createMock = jest.fn();
		removeMock = jest.fn();

		for(let service of dataServices) {
			broker.createService({
				name: service,
				actions: {
					find: () => [
						{
							id: 'ID_' + service + "_1",
							foo: 'bar-' + service + '-1'
						},
						{
							id: 'ID_' + service + "_2",
							foo: 'bar-' + service + '-2'
						}
					],
					remove: removeMock,
					create: createMock
				}
			})
		}

	});
	afterEach(async () => await broker.stop());

	it.only('should dump and restore', async () => {
		const dumpPath = path.resolve(__dirname, '..', '..', 'tmp', 'dump_' + Math.round(Math.random()*0xffffffff)).toString(16);
		const response1 = await broker.call('cli.dumpDb', { dumpPath });
		expect(response1).toHaveProperty('dumpPath', dumpPath);
		expect(response1).toHaveProperty('entities');

		const response2 = await broker.call('cli.restoreDb', { dumpPath });
		expect(response2).toHaveProperty('dumpPath', dumpPath)
		expect(response1).toHaveProperty('entities');
		expect(response2).toHaveProperty('errors', 0);

		expect(createMock.mock.calls.length).toBe(10)
		expect(removeMock.mock.calls.length).toBe(10)

		expect(createMock.mock.calls.map(c => c[0].params._id)).toContain('ID_battleStore_1')
		expect(createMock.mock.calls.map(c => c[0].params._id)).toContain('ID_battleStore_2')
		expect(createMock.mock.calls.map(c => c[0].params._id)).toContain('ID_challenges_1')
		expect(createMock.mock.calls.map(c => c[0].params._id)).toContain('ID_league_2')
		expect(createMock.mock.calls.map(c => c[0].params._id)).toContain('ID_scriptStore_1')
		expect(createMock.mock.calls.map(c => c[0].params._id)).toContain('ID_userStore_2')
	});

});
