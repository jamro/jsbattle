"use strict";

const selectOpponents = require("../../../../app/services/league/selectOpponents.js");
const serviceMocks = {
	'league.count': jest.fn(),
	'league.find': jest.fn(),
}

const ctx = {
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
	serviceMocks['league.count'].mockReturnValue(100)
	serviceMocks['league.find'].mockReturnValue([
		{id: 1}
	])
});

describe("selectOpponents", () => {

		it('should throw error when cannot match opponent',  async () => {
			serviceMocks['league.count'].mockReturnValue(0);
			await expect(
				selectOpponents(ctx)
			).rejects.toThrow(/no opponents/i);

			serviceMocks['league.count'].mockReturnValue(1)
			await expect(
				selectOpponents(ctx)
			).rejects.toThrow(/no opponents/i);

			serviceMocks['league.count'].mockReturnValue(2)
			serviceMocks['league.find'].mockReturnValue([])
			await expect(
				selectOpponents(ctx)
			).rejects.toThrow(/no opponents/i);

		});

		it('should return two opponents',  async () => {
			let result = await selectOpponents(ctx);

			expect(serviceMocks['league.find'].mock.calls).toHaveLength(2);
			expect(result).toHaveLength(2);


		});

});
