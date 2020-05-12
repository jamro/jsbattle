"use strict";

const ConfigBroker = require("../../../app/lib/ConfigBroker.js");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const UbdJsonMock = require('../../mock/UbdJsonMock');

const validateMock = jest.fn();

describe("Test 'UbdPlayer' service", () => {
	let broker;

	beforeEach(async () => {

		validateMock.mockReset();
		validateMock.mockReturnValue({valid: true});

		let config = {
			"ubdPlayer": {
        "queueLimit": 3,
        "queueQueryTime": 10,
        "port": 8199,
        "speed": 100,
        "timeout": 30000
      }
		};
		broker = new ConfigBroker({ logger: false }, config, false);
		broker.createService({
			name: 'ubdValidator',
			actions: {
				validate: validateMock
			}
		});

		broker.loadService(__dirname + "../../../../app/services/UbdPlayer.service.js");
		await broker.start()
	});
	afterEach(() => broker.stop());

	it('should have empty queue at start', async () => {
		let result = await broker.call('ubdPlayer.getQueueLength', { }, { });
		expect(result).toBe(0)
  });

	it('should add to queue up to the limit', async () => {
		let size;
		const ubd = new UbdJsonMock();
		await broker.call('ubdPlayer.scheduleBattle', { ubd }, { });
		size = await broker.call('ubdPlayer.getQueueLength', { }, { });
		expect(size).toBe(1);
		await broker.call('ubdPlayer.scheduleBattle', { ubd }, { });
		size = await broker.call('ubdPlayer.getQueueLength', { }, { });
		expect(size).toBe(2);
		await broker.call('ubdPlayer.scheduleBattle', { ubd }, { });
		size = await broker.call('ubdPlayer.getQueueLength', { }, { });
		expect(size).toBe(3);

		await expect(
			broker.call('ubdPlayer.scheduleBattle', { ubd }, { })
		).rejects.toThrow(/limit exceeded/i)
		expect(size).toBe(3);
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

		await broker.call('ubdPlayer.scheduleBattle', { ubd }, { });

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
