"use strict";

const updateScores = require("../../../../app/services/league/updateScores.js");
const serviceMocks = {
	'league.get': jest.fn(),
	'league.update': jest.fn(),
}

const ctx = {
	params: {},
	call: jest.fn((method, params, meta) => {
		if(!serviceMocks[method]) {
			throw new Error('Not implemented method: ' + method);
		}
		return serviceMocks[method](method, params, meta)
	})
}

beforeEach(() => {
	for(let service in serviceMocks) {
		serviceMocks[service].mockReset();
	}
	serviceMocks['league.get'].mockImplementation((method, params, meta) => {
		if(!params.id) {
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
		if(!db[params.id]) {
			throw new Error('entity ' + params.id  + ' not found');
		}
		return db[params.id]
	});
	ctx.params = {
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
	}
});

describe("updateScores", () => {

	it('should throw error when no valid teamList in input',  async () => {
		ctx.params.teamList = undefined;
		await expect(
			updateScores(ctx)
		).rejects.toThrow(/teamList must have exactly 2 elements/i);

		ctx.params.teamList = []
		await expect(
			updateScores(ctx)
		).rejects.toThrow(/teamList must have exactly 2 elements/i);

		ctx.params.teamList =  [ { foo: 'bar' } ]
		await expect(
			updateScores(ctx)
		).rejects.toThrow(/teamList must have exactly 2 elements/i);
	});

	it('should throw error when no valid ref data in input',  async () => {
		ctx.params.refData = undefined
		await expect(
			updateScores(ctx)
		).rejects.toThrow(/no team mapping in refData/i);

		ctx.params.refData = {
			gamma: '5432'
		}
		await expect(
			updateScores(ctx)
		).rejects.toThrow(/no team mapping in refData/i);

	});

	it('should update stats',  async () => {
		await updateScores(ctx);
		expect(serviceMocks['league.update'].mock.calls).toHaveLength(2);
		let entity1 = serviceMocks['league.update'].mock.calls[0][1];
		let entity2 = serviceMocks['league.update'].mock.calls[1][1];
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
});
