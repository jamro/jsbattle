"use strict";

const serviceConfig = require('../../../app/lib/serviceConfig.js');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const UbdJsonMock = require('../../mock/UbdJsonMock');

const validateMock = jest.fn();
const readQueue = jest.fn();
const writeQueue = jest.fn();

describe("Test 'UbdPlayer' service", () => {
	let broker;
	serviceConfig.extend({
		"ubdPlayer": {
			"queueQueryTime": 10,
			"speed": 100,
			"timeout": 30000
		}
	});

	beforeEach(async () => {

		validateMock.mockReset();
		validateMock.mockReturnValue({valid: true});

		broker = new ServiceBroker({ logger: false });
		broker.createService({
			name: 'ubdValidator',
			actions: {
				validate: validateMock
			}
		});
		broker.createService({
				name: 'queue',
				actions: {
					read: readQueue,
					write: writeQueue,
				}
		})

		const schemaBuilder = require(__dirname + "../../../../app/services/ubdPlayer/index.js");
		broker.createService(schemaBuilder(serviceConfig.data));
		await broker.start()
	});
	afterEach(() => broker.stop());

	it('should pick random port', async () => {
		let broker1 = new ServiceBroker({ logger: false });
		const schemaBuilder = require(__dirname + "../../../../app/services/ubdPlayer/index.js");
		broker1.createService(schemaBuilder(serviceConfig.data));
		await broker1.start();
		let broker2 = new ServiceBroker({ logger: false });
		broker2.createService(schemaBuilder(serviceConfig.data));
		await broker2.start();
		await broker1.stop();
		await broker2.stop();
	});

	it('should play the battle', async () => {
		jest.setTimeout(30000);
		const ubd = {
      version: 3,
      rngSeed: 0.43,
      aiList: [
				{
					name: 'alpha',
					team: 'asdfrvw423',
					initData: null,
					useSandbox: true,
					code: 'tank.init(function(n,t){}),tank.loop(function(n,t){t.THROTTLE=1,t.BOOST=1});',
					executionLimit: 100
				},
	      {
					name: 'beta',
					team: 'ncsu8a7d3',
					initData: null,
					useSandbox: true,
					code: 'tank.init(function(n,t){}),tank.loop(function(n,t){t.THROTTLE=1,t.BOOST=1});',
					executionLimit: 100
				 }
			 ],
      teamMode: false,
      timeLimit: 5000
		};

		readQueue.mockReturnValueOnce({ payload: { ubd }, ok: true });

		let params = await new Promise((resolve) => {
			broker.createService({
				name: 'eventWatcher',
				events: {
					"ubdPlayer.battle.*": async (ctx) => {
						resolve(ctx.params);
					}
				},
			});
		});

		expect(params).toHaveProperty('timeElapsed', 5000);
		expect(params).toHaveProperty('timeElapsed', 5000);
		expect(params).toHaveProperty('tankList');
		expect(params).toHaveProperty('teamList');

		const teamList = params.teamList;
		const tankList = params.tankList;

		expect(tankList).toHaveLength(2)
		expect(tankList[0]).toHaveProperty('id')
		expect(tankList[0]).toHaveProperty('team', 'asdfrvw423')
		expect(tankList[0]).toHaveProperty('name', 'alpha')
		expect(tankList[0]).toHaveProperty('fullName', 'alpha #1')
		expect(Math.round(tankList[0].energy)).toBe(64)
		expect(Math.round(tankList[0].score)).toBe(0)
		expect(tankList[1]).toHaveProperty('id')
		expect(tankList[1]).toHaveProperty('team', 'ncsu8a7d3')
		expect(tankList[1]).toHaveProperty('name', 'beta')
		expect(tankList[1]).toHaveProperty('fullName', 'beta #2')
		expect(Math.round(tankList[1].energy)).toBe(66)
		expect(Math.round(tankList[1].score)).toBe(0)

		expect(teamList).toHaveLength(2)
		expect(teamList[0]).toHaveProperty('name', 'asdfrvw423')
		expect(teamList[0]).toHaveProperty('aliveCount', 1)
		expect(teamList[0]).toHaveProperty('maxEnergy', 100)
		expect(teamList[0]).toHaveProperty('size', 1)
		expect(teamList[0]).toHaveProperty('score', 0)
		expect(Math.round(teamList[0].energy)).toBe(64)
		expect(teamList[1]).toHaveProperty('name', 'ncsu8a7d3')
		expect(teamList[1]).toHaveProperty('aliveCount', 1)
		expect(teamList[1]).toHaveProperty('maxEnergy', 100)
		expect(teamList[1]).toHaveProperty('size', 1)
		expect(teamList[1]).toHaveProperty('score', 0)
		expect(Math.round(teamList[1].energy)).toBe(66)

	});

});
