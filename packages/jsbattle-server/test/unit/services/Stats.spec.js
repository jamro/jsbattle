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
				count: () => 764,
				get: async () => ({
					"id": "uqnGXXnSKTs6Xl5h",
					"username": "alpha",
					"displayName": "Alpha Centauri",
					"provider": "mock",
					"extUserId": "mock_01",
					"email": "mock@example.com",
					"registered": true,
					"role": "admin",
					"createdAt": "2020-06-25T11:59:37.453Z",
					"lastLoginAt": "2020-06-25T11:59:39.119Z"
				})
			}
		});
		broker.createService({
			name: 'league',
			actions: {
				count: () => 665,
				find: () => [{
	          "id": "qTYS3Rq5TYCsVIq1",
	          "scriptId": "FIoRSZ4A7jzzjVkr",
	          "scriptName": "venom",
	          "joinedAt": "2020-06-25T11:59:57.311Z",
	          "fights_total": 2,
	          "fights_win": 0,
	          "fights_lose": 2,
	          "fights_error": 0,
	          "score": 0
	      }]
			}
		});
		broker.createService({
			name: 'battleStore',
			actions: {
				count: () => 125,
				find: () => [{
						"id": "H60MduWgZHatFE14",
						"meta": [
								{
										"id": "qTYS3Rq5TYCsVIq1",
										"name": "mock/venom",
										"battleScore": 20,
										"winner": false
								},
								{
										"id": "BtMRNA9fNoTmwlcv",
										"name": "jsbattle/jamro",
										"battleScore": 215.39000000000001,
										"winner": true
								}
						],
						"description": "mock/venom vs jsbattle/jamro",
						"createdAt": "2020-06-25T12:00:18.565Z",
						"expiresAt": "2020-06-28T12:00:18.565Z"
				}]
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
				count: () => 293,
				find: () => [{
					"challengeId": "challenge-8UCUaNvC",
					"modifiedAt": "2020-06-25T11:59:41.729Z",
					"completed": true
				}]
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
				count: () => 402,
				find: () => [
					{
						"id": "1TFcBHuTSNuKVZyH",
						"scriptName": "sharma",
						"createdAt": "2020-06-25T11:59:59.872Z",
						"modifiedAt": "2020-06-25T11:59:59.872Z",
						"hash": "90b359ff9cbe540a42c200e096d0a59e"
					}
				]
			}
		});
		await broker.loadService(__dirname + "../../../../app/services/Stats.service.js");
		await broker.start()
	});
	afterEach(async () => await broker.stop());

	it('should get summary of app', async () => {
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

	it('should get summary of user', async () => {
		let result = await broker.call('stats.getUserSummary', {id: '1234561234'});
		expect(result).toEqual(expect.objectContaining({
			"account": {
        "id": "uqnGXXnSKTs6Xl5h",
        "username": "alpha",
        "displayName": "Alpha Centauri",
        "provider": "mock",
        "extUserId": "mock_01",
        "email": "mock@example.com",
        "registered": true,
        "role": "admin",
        "createdAt": "2020-06-25T11:59:37.453Z",
        "lastLoginAt": "2020-06-25T11:59:39.119Z"
      }
		}));
		expect(result).toEqual(expect.objectContaining({
			"scripts": [
        {
          "id": "1TFcBHuTSNuKVZyH",
          "scriptName": "sharma",
          "createdAt": "2020-06-25T11:59:59.872Z",
          "modifiedAt": "2020-06-25T11:59:59.872Z",
          "hash": "90b359ff9cbe540a42c200e096d0a59e"
        }
      ]
		}));
		expect(result).toEqual(expect.objectContaining({
			"league": {
        "id": "qTYS3Rq5TYCsVIq1",
        "scriptId": "FIoRSZ4A7jzzjVkr",
        "scriptName": "venom",
        "joinedAt": "2020-06-25T11:59:57.311Z",
        "fights_total": 2,
        "fights_win": 0,
        "fights_lose": 2,
        "fights_error": 0,
        "score": 0
      }
		}));
		expect(result).toEqual(expect.objectContaining({
			"battles": [
        {
          "id": "H60MduWgZHatFE14",
          "meta": [
            {
              "id": "qTYS3Rq5TYCsVIq1",
              "name": "mock/venom",
              "battleScore": 20,
              "winner": false
            },
            {
              "id": "BtMRNA9fNoTmwlcv",
              "name": "jsbattle/jamro",
              "battleScore": 215.39000000000001,
              "winner": true
            }
          ],
          "description": "mock/venom vs jsbattle/jamro",
          "createdAt": "2020-06-25T12:00:18.565Z",
          "expiresAt": "2020-06-28T12:00:18.565Z"
        }
      ]
		}));
		expect(result).toEqual(expect.objectContaining({
			"challenges": [
	        {
	          "challengeId": "challenge-8UCUaNvC",
	          "modifiedAt": "2020-06-25T11:59:41.729Z",
	          "completed": true
	        }
	      ]
		}));
	});



});
