"use strict";

const ConfigBroker = require("../../../app/lib/ConfigBroker.js");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;

describe("Test 'Stats' service", () => {
	let broker;

	beforeEach(async () => {
		broker = new ConfigBroker({ logger: false }, {}, false);
		broker.createService({
			name: 'userStore',
			actions: {
				count: () => 764
			}
		});
		broker.createService({
			name: 'league',
			actions: {
				count: () => 665
			}
		});
		broker.createService({
			name: 'battleStore',
			actions: {
				count: () => 125
			}
		});
		broker.createService({
			name: 'node',
			actions: {
				getInfo: () => ({nodeCount: 751})
			}
		});
		broker.createService({
			name: 'challenges',
			actions: {
				count: () => 293
			}
		});
		broker.createService({
			name: 'activityMonitor',
			actions: {
				listActiveSessions: () => [{}, {}, {}, {}]
			}
		});
		broker.createService({
			name: 'scriptStore',
			actions: {
				count: () => 402
			}
		});
		await broker.loadService(__dirname + "../../../../app/services/Stats.service.js");
		await broker.start()
	});
	afterEach(async () => await broker.stop());

	it('should get summary', async () => {
		let result = await broker.call('stats.getSummary');

		expect(result).toEqual(expect.objectContaining({
      users: {
				all: 764,
				registered: 764,
				active: 764,
				online: 4
			}
		}));
		expect(result).toEqual(expect.objectContaining({
			league: {
				size: 665,
				entriesPerDay: 665,
				battlesPerHour: 125,
				battlesStored: 125
			}
		}));
		expect(result).toEqual(expect.objectContaining({
			challenges: {
				'challenge-8UCUaNvC': 293,
				'challenge-Du7tyrCB': 293,
				'challenge-4syTf6ph': 293,
				'challenge-hXMwLdZw': 293,
				'challenge-tV3fKHBw': 293,
				'challenge-6iZxC1FP': 293
			}
		}));
		expect(result).toEqual(expect.objectContaining({
			scriptCount: 402,
			nodes: 751
		}));

	});


});
