"use strict";
const serviceConfig = require('../../../app/lib/serviceConfig.js');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const path = require('path');

const createTestToken = (user) => ({
	id: (user ? user.id : '') || "123456",
	username: (user ? user.username : '') || "amy",
	role: (user ? user.role : '') || "user",
})

const ownScript = {
	ownerId: '92864',
	ownerName: 'monica83',
	scriptId: '89052534623',
	scriptName: 'reptori8743',
	code: '// hello 17487252'
}

const leagueHistoryDuration = 3*60*60*1000

const readQueue = jest.fn();
const writeQueue = jest.fn();
const pickRandomOpponents = jest.fn();
const leagueUpdate = jest.fn();
const leagueFailBattle = jest.fn();
const leagueGet = jest.fn();
const leagueUpdateRank = jest.fn();
const battleStoreCreate = jest.fn();

describe("Test 'League' service", () => {

	let broker;

	beforeEach(async () => {
		pickRandomOpponents.mockReturnValue([
			{
				id: '2g34a52',
				ownerName: 'alpha',
				scriptName: 'a-84',
				code: '// code 834212',
			},
			{
				id: '99dg582',
				ownerName: 'beta',
				scriptName: 'b-93',
				code: '// code 77235',
			}
		]);
		leagueGet.mockImplementation((ctx) => {
			if(!ctx.params.id) {
				throw new Error('id is requried!');
			}
			const db = {
				'987243': {
					'id': '987243',
					'ownerName': 'roger',
					'scriptName': 'kalix',
					'fights_total': 93,
					'fights_win': 5,
					'fights_lose': 88,
					'score': 120
				},
				'50872': {
					'id': '50872',
					'ownerName': 'barbra',
					'scriptName': 'matix',
					'fights_total': 204,
					'fights_win': 190,
					'fights_lose': 14,
					'score': 853
				}
			}
			if(!db[ctx.params.id]) {
				throw new Error('entity ' + ctx.params.id  + ' not found');
			}
			return db[ctx.params.id]
		});

		let now = new Date().getTime();
		serviceConfig.extend({
			 auth: {
				 admins: [{provider: 'google', username: 'monica83' }]
			 },
			 league: {
					scheduleInterval: 10,
					timeLimit: 3000,
					teamSize: 3,
					historyDuration: leagueHistoryDuration
				},
			 ubdPlayer: {
				 queueLimit: 11
			 }
		});
		broker = new ServiceBroker(require('../../utils/getLoggerSettings.js')(path.resolve(__dirname, '..', '..'), __filename, expect.getState()));
		broker.createService({
				name: 'scriptStore',
				actions: {
					getUserScript: (ctx) => {
						switch(ctx.params.id) {
							case '999999':
								return {
									ownerId: '123456',
									ownerName: 'another_user',
									scriptId: '9324531928',
									scriptName: 'secret script',
									code: '// hello 48772'
								}
							case '152674':
								return ownScript
							default:
								throw new Error('not found')
						}
					}
				}
		})
		broker.createService({
				name: 'battleStore',
				actions: {
					create: battleStoreCreate,
				}
		})
		broker.createService({
				name: 'queue',
				actions: {
					read: readQueue,
					write: writeQueue,
				}
		})

		broker.createService({
				name: 'league',
				actions: {
					pickRandomOpponents: pickRandomOpponents,
					update: leagueUpdate,
					get: leagueGet,
					updateRank: leagueUpdateRank,
					failBattle: leagueFailBattle
				}
		})
		const schemaBuilder = require(__dirname + "../../../../app/services/leagueScheduler/index.js");
		broker.createService(schemaBuilder(serviceConfig.data));
		await broker.start();
	});

	afterEach(() => broker.stop());


	it('should schedule battles after start',  async () => {
		writeQueue.mockReset();
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(writeQueue.mock.calls.length).toBeGreaterThan(0);
	});

	it('should not schedule battles when league is empty',  async () => {
		pickRandomOpponents.mockImplementation(() => {
			throw new Error('no opponents')
		})
		writeQueue.mockReset();
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(writeQueue.mock.calls.length).toBe(0);
	});

	it('should process battle result',  async () => {
		leagueUpdate.mockReset();
		battleStoreCreate.mockReset();
		await broker.emit('ubdPlayer.battle.league', {
			teamList: [
				{
					name: 'roger/kalix',
					score: 120
				},
				{
					name: 'barbra/matix',
					score: 853
				}
			],
			ubd: {"foo": "bar3245234"},
			refData: {
				'roger/kalix': '987243',
				'barbra/matix': '50872'
			}
		});

		expect(battleStoreCreate.mock.calls).toHaveLength(1);
		expect(battleStoreCreate.mock.calls[0][0]).toHaveProperty('params');
		expect(battleStoreCreate.mock.calls[0][0].params).toHaveProperty('ubd', JSON.stringify({"foo": "bar3245234"}));
		expect(battleStoreCreate.mock.calls[0][0].params).toHaveProperty('description', 'roger/kalix vs barbra/matix');
		expect(battleStoreCreate.mock.calls[0][0].params).toHaveProperty('expiresIn', leagueHistoryDuration);
		expect(battleStoreCreate.mock.calls[0][0].params).toHaveProperty('meta');
		expect(battleStoreCreate.mock.calls[0][0].params.meta).toHaveLength(2);
		expect(battleStoreCreate.mock.calls[0][0].params).toHaveProperty('owner');
		expect(battleStoreCreate.mock.calls[0][0].params.owner).toHaveLength(2);
		expect(battleStoreCreate.mock.calls[0][0].params.owner).toEqual(expect.arrayContaining(['987243', '50872']));

		expect(leagueUpdateRank.mock.calls).toHaveLength(2);
		expect(leagueUpdateRank.mock.calls[0]).toHaveLength(1);
		expect(leagueUpdateRank.mock.calls[1]).toHaveLength(1);
		expect(leagueUpdateRank.mock.calls[0][0]).toHaveProperty('params');
		expect(leagueUpdateRank.mock.calls[1][0]).toHaveProperty('params');

		let entityId1 = leagueUpdateRank.mock.calls[0][0].params.id
		let entityId2 = leagueUpdateRank.mock.calls[1][0].params.id
		let entityWon1 = leagueUpdateRank.mock.calls[0][0].params.winner
		let entityWon2 = leagueUpdateRank.mock.calls[1][0].params.winner

		expect(entityId1).toBe('987243');
		expect(entityId2).toBe('50872');
		expect(entityWon1).toBe(false);
		expect(entityWon2).toBe(true);

	});

	it('should handle battle errors',  async () => {
		leagueUpdate.mockReset();
		leagueUpdateRank.mockReset();
		leagueFailBattle.mockReset();
		await broker.emit('ubdPlayer.battle.league', { error: 'oops8762', refData: {'t1': 29345, 't2': 87543}});
		expect(leagueUpdate.mock.calls).toHaveLength(0);
		expect(leagueUpdateRank.mock.calls).toHaveLength(0);

		expect(leagueFailBattle.mock.calls).toHaveLength(2);
		let params1 = leagueFailBattle.mock.calls[0][0].params;
		let params2 = leagueFailBattle.mock.calls[1][0].params;
		expect(params1).toHaveProperty('id', 29345);
		expect(params2).toHaveProperty('id', 87543);
	});

});
