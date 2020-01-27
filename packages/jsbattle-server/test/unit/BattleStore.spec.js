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

		it('should store battle as text data', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {ubd: JSON.stringify(ubd)});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			expect(readResult.error).toBeUndefined();
			expect(readResult.id).toBe(writeResult.id);
			expect(readResult.ubd).toBe(JSON.stringify(ubd));
		});

		it('should throw an error when a battle does not exists', async () => {
			expect(
				broker.call("battleStore.get", {id: '00000-02345987134598'})
			).rejects.toThrow(MoleculerClientError)
		});

		it('should throw an error when id is missing for get call', async () => {
			expect(
				broker.call("battleStore.get", {})
			).rejects.toThrow(ValidationError)
		});

		it('should throw an error when ubd is missing for create call', async () => {
			expect(
				broker.call("battleStore.create", {})
			).rejects.toThrow(ValidationError)
		});

		it('should list all battles', async () => {
			for(let i=0; i < 10; i++) {
				const writeResult = await broker.call("battleStore.create", {ubd: JSON.stringify(new UbdJsonMock())});
				expect(writeResult.error).toBeUndefined();
			}
			const readResult = await broker.call("battleStore.list", {});
			expect(readResult.rows).toBeDefined();
			expect(readResult.rows.length).toBe(10);
		});

	});

	describe("ubdValidator always fails", () => {

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
				broker.call("battleStore.create", {ubd: JSON.stringify(ubd)})
			).rejects.toThrow(MoleculerClientError)
		});
	});
});
