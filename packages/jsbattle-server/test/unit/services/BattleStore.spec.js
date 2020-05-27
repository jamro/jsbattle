"use strict";

const ConfigBroker = require("../../../app/lib/ConfigBroker.js");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const UbdJsonMock = require('../../mock/UbdJsonMock');

const defaultExpireTime = 30*24*60*60*1000;

describe("Test 'Battlestore' service", () => {

	describe("ubdValidator always pass", () => {
		const config = {
			battleStore: {
				defaultExpireTime: defaultExpireTime,
				cleanupInterval: 100
			}
		};
		let broker = new ConfigBroker({ logger: false }, config, false);
		broker.createService({
				name: 'ubdValidator',
				actions: {
				validate: () => ({valid: true})
			}
		})
		broker.loadService(__dirname + "../../../../app/services/BattleStore.service.js");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		beforeEach(async () => {
			let readResult = await broker.call("battleStore.list", {});
			readResult = readResult.rows.map((row) => row.id);
			let removals = readResult.map((id) => broker.call("battleStore.remove", { id }));
			await Promise.all(removals);
		})

		it('should store battle as text data', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {ubd: JSON.stringify(ubd)});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			expect(readResult.error).toBeUndefined();
			expect(readResult.id).toBe(writeResult.id);
			expect(readResult.ubd).toBe(JSON.stringify(ubd));
		});

		it('should store metadata of the battle', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {
				ubd: JSON.stringify(ubd),
				description: "my battle 7872345234"
			});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			expect(readResult.error).toBeUndefined();
			expect(readResult.id).toBe(writeResult.id);
			expect(readResult.ubd).toBe(JSON.stringify(ubd));
			expect(readResult.description).toBe("my battle 7872345234");
		});

		it('should throw an error when a battle does not exists', async () => {
			await expect(
				broker.call("battleStore.get", {id: '00000-02345987134598'})
			).rejects.toThrow(MoleculerClientError)
		});

		it('should throw an error when id is missing for get call', async () => {
			await expect(
				broker.call("battleStore.get", {})
			).rejects.toThrow(ValidationError)
		});

		it('should throw an error when ubd is missing for create call', async () => {
			await expect(
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

		it('should not update read-only fields', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {ubd: JSON.stringify(ubd)});
			ubd.rngSeed = 0.89273772;
			const updateResult = await broker.call("battleStore.update", {id: writeResult.id, ubd: JSON.stringify(ubd), createdAt: new Date(0)});
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			expect(readResult.error).toBeUndefined();
			expect(readResult.id).toBe(writeResult.id);
			expect(readResult.ubd).toBe(writeResult.ubd);
			expect(readResult.createdAt).toBe(writeResult.createdAt);
		});

		it('should set default expiration time', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {ubd: JSON.stringify(ubd)});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			const now = new Date().getTime();
			const expiresAt = readResult.expiresAt.getTime();
			const expiresPeriod = expiresAt - now;
			const dt = Math.abs(defaultExpireTime - expiresPeriod);
			expect(dt < 5000).toBe(true);
		});

		it('should set expiration time by expiresAt field', async () => {
			const expectedExpiresAt = new Date().getTime() + 823587924

			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {
				ubd: JSON.stringify(ubd),
				expiresAt: new Date(expectedExpiresAt)
			});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			const now = new Date().getTime();
			const expiresAt = readResult.expiresAt.getTime();
			const dt = Math.abs(expectedExpiresAt - expiresAt);
			expect(dt < 5000).toBe(true);
		});

		it('should set expiration time by expiresIn field', async () => {
			const expiresIn = 198347523;
			const expectedExpiresAt = new Date().getTime() + expiresIn

			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {
				ubd: JSON.stringify(ubd),
				expiresIn: expiresIn
			});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			const now = new Date().getTime();
			const expiresAt = readResult.expiresAt.getTime();
			const dt = Math.abs(expectedExpiresAt - expiresAt);
			expect(dt < 5000).toBe(true);
		});

		it('should not store expired battles', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {
				ubd: JSON.stringify(ubd),
				expiresIn: -100000
			});
			expect(writeResult.error).toBeUndefined();
			expect(writeResult.id).toBeUndefined();
		});

		it('should remove battles after expire date', async () => {
			const ubd = new UbdJsonMock();
			await broker.call("battleStore.create", {
				ubd: JSON.stringify(ubd),
				expiresIn: 100
			});
			await broker.call("battleStore.create", {
				ubd: JSON.stringify(ubd),
				expiresIn: 1000000
			});

			const readResult1 = await broker.call("battleStore.list", {});
			expect(readResult1).toHaveProperty('total', 2);

			await new Promise((resolve) => setTimeout(resolve, 700));

			const readResult2 = await broker.call("battleStore.list", {});
			expect(readResult2).toHaveProperty('total', 1);

		});

	});

	describe("ubdValidator always fails", () => {

		let broker = new ConfigBroker({ logger: false }, {}, false);
		broker.createService({
				name: 'ubdValidator',
				actions: {
				validate: () => ({valid: false, error: 'Something went wrong'})
			}
		})
		broker.loadService(__dirname + "../../../../app/services/BattleStore.service.js");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		it('throw error when invalid UBD', async () => {
			const ubd = new UbdJsonMock();
			ubd.version = -1;
			await expect(
				broker.call("battleStore.create", {ubd: JSON.stringify(ubd)})
			).rejects.toThrow(MoleculerClientError)
		});
	});
});
