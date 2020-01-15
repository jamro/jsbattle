"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const UbdJsonMock = require('../mock/UbdJsonMock');

describe("Test 'Battlestore' service", () => {

	describe("ubdValidator always pass", () => {

		let broker = new ServiceBroker({ logger: false });
		broker.serviceConfig = {};
		broker.createService({
				name: 'ubdValidator',
				actions: {
				validate: () => ({valid: true})
			}
		})
		broker.loadService(__dirname + "../../../app/services/BattleStore.service.js");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		it('should store battle as JSON data', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.publish", {ubd: ubd});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.getReplay", {battleId: writeResult.battleId});

			expect(readResult.error).toBeUndefined();
			expect(readResult.battleId).toBe(writeResult.battleId);
			expect(JSON.stringify(readResult.ubd)).toBe(JSON.stringify(ubd));
		});

		it('should store battle as text data', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.publish", {ubd: JSON.stringify(ubd)});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.getReplay", {battleId: writeResult.battleId});

			expect(readResult.error).toBeUndefined();
			expect(readResult.battleId).toBe(writeResult.battleId);
			expect(JSON.stringify(readResult.ubd)).toBe(JSON.stringify(ubd));
		});

		it('should throw an error when a battle does not exists', async () => {
			expect(
				broker.call("battleStore.getReplay", {battleId: '00000-02345987134598'})
			).rejects.toThrow(MoleculerClientError)
		});

		it('should throw an error when battleId is missing for getReplay call', async () => {
			expect(
				broker.call("battleStore.getReplay", {})
			).rejects.toThrow(MoleculerClientError)
		});

		it('should throw an error when ubd is missing for publish call', async () => {
			expect(
				broker.call("battleStore.publish", {})
			).rejects.toThrow(MoleculerClientError)
		});
	});

	describe("ubdValidator always fail", () => {

		let broker = new ServiceBroker({ logger: false });
		broker.serviceConfig = {};
		broker.createService({
				name: 'ubdValidator',
				actions: {
				validate: () => ({valid: false, error: 'Something went wrong'})
			}
		})
		broker.loadService(__dirname + "../../../app/services/BattleStore.service.js");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		it('throw error when invalid UBD', async () => {
			const ubd = new UbdJsonMock();
			ubd.version = -1;
			expect(
				broker.call("battleStore.publish", {ubd: JSON.stringify(ubd)})
			).rejects.toThrow(MoleculerClientError)
		});
	});
});
