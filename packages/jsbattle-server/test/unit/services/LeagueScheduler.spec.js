"use strict";
const ConfigBroker = require("../../../app/lib/ConfigBroker.js");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;

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

const scheduleBattle = jest.fn();
const getQueueLength = jest.fn();
const pickRandomOpponents = jest.fn();
const leagueUpdate = jest.fn();
const leagueGet = jest.fn();

describe("Test 'League' service", () => {

	let broker;

	beforeEach(async () => {
		getQueueLength.mockReturnValue(0);
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
		let config = {
			 auth: {
				 admins: [{provider: 'google', username: 'monica83' }]
			 },
			 league: {
					scheduleInterval: 10,
					timeLimit: 3000,
					teamSize: 3
				},
			 ubdPlayer: {
				 queueLimit: 11
			 }
		 };
		broker = new ConfigBroker({ logger: false }, config, false);
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
				name: 'ubdPlayer',
				actions: {
					getQueueLength: getQueueLength,
					scheduleBattle: scheduleBattle
				}
		})
		broker.createService({
				name: 'league',
				actions: {
					pickRandomOpponents: pickRandomOpponents,
					update: leagueUpdate,
					get: leagueGet
				}
		})
		broker.loadService(__dirname + "../../../../app/services/LeagueScheduler.service.js");
		await broker.start();
	});

	afterEach(() => broker.stop());


	it('should schedule battles after start',  async () => {
		scheduleBattle.mockReset();
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(scheduleBattle.mock.calls.length).toBeGreaterThan(0);
	});

	it('should not schedule battles when league is empty',  async () => {
		pickRandomOpponents.mockImplementation(() => {
			throw new Error('no opponents')
		})
		scheduleBattle.mockReset();
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(scheduleBattle.mock.calls.length).toBe(0);
	});

	it('should not schedule battles when queue limit exceeded',  async () => {
		scheduleBattle.mockReset();
		getQueueLength.mockReturnValue(11);

		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(scheduleBattle.mock.calls.length).toBe(0);
	});

	it('should process battle result',  async () => {
		leagueUpdate.mockReset();
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
			refData: {
				'roger/kalix': '987243',
				'barbra/matix': '50872'
			}
		});

		expect(leagueUpdate.mock.calls).toHaveLength(2);
		let entity1 = leagueUpdate.mock.calls[0][0].params;
		let entity2 = leagueUpdate.mock.calls[1][0].params;
		expect(entity1).toHaveProperty('id', '987243');
		expect(entity1).toHaveProperty('fights_total', 94);
		expect(entity1).toHaveProperty('fights_win', 5);
		expect(entity1).toHaveProperty('fights_lose', 89);
		expect(entity1).toHaveProperty('score', 100);
		expect(entity2).toHaveProperty('id', '50872');
		expect(entity2).toHaveProperty('fights_total', 205);
		expect(entity2).toHaveProperty('fights_win', 191);
		expect(entity2).toHaveProperty('fights_lose', 14);
		expect(entity2).toHaveProperty('score', 885);
	});


	it('should not process battle errors',  async () => {
		leagueUpdate.mockReset();
		await broker.emit('ubdPlayer.battle.league', { error: 'oops8762'});

		expect(leagueUpdate.mock.calls).toHaveLength(0);
	});

});
