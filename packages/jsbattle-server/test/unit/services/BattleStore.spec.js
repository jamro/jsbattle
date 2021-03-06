"use strict";

const serviceConfig = require('../../../app/lib/serviceConfig.js');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const UbdJsonMock = require('../../mock/UbdJsonMock');
const path = require('path');

const defaultExpireTime = 30*24*60*60*1000;

describe("Test 'Battlestore' service", () => {

	describe("ubdValidator always pass", () => {
		serviceConfig.extend({
			battleStore: {
				defaultExpireTime: defaultExpireTime,
				cleanupInterval: 100
			}
		});
		let broker = new ServiceBroker(require('../../utils/getLoggerSettings.js')(path.resolve(__dirname, '..', '..'), __filename, expect.getState()));
		broker.createService({
				name: 'ubdValidator',
				actions: {
				validate: () => ({valid: true})
			}
		})
		const schemaBuilder = require(__dirname + "../../../../app/services/battleStore/index.js");
		broker.createService(schemaBuilder(serviceConfig.data));
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

		it('should store battle as long text data', async () => {
			const limit = 524288;
			const longText = 'a'.repeat(limit-8);
			const longUbdText = `{"a":"${longText}"}`;
			const writeResult = await broker.call("battleStore.create", {ubd: longUbdText});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			expect(readResult.error).toBeUndefined();
			expect(readResult.id).toBe(writeResult.id);
			expect(readResult.ubd).toBe(longUbdText);
		});


		it('should store battle meta data', async () => {
			const ubd = new UbdJsonMock();
			const writeResult = await broker.call("battleStore.create", {
				ubd: JSON.stringify(ubd),
				meta: {foo73: "bar84"}
			});
			expect(writeResult.error).toBeUndefined();
			const readResult = await broker.call("battleStore.get", {id: writeResult.id});

			expect(readResult.error).toBeUndefined();
			expect(readResult).toHaveProperty('meta');
			expect(readResult.meta).toHaveProperty('foo73', 'bar84');
			expect(readResult.ubd).toBe(JSON.stringify(ubd));
		});

		it('should store owner info', async () => {
			const ubd = JSON.stringify(new UbdJsonMock());
			await broker.call("battleStore.create", { ubd, meta: 1 });
			await broker.call("battleStore.create", { ubd, meta: 2, owner: ['111', '222'] });
			await broker.call("battleStore.create", { ubd, meta: 3, owner: ['222', '111', '333'] });
			await broker.call("battleStore.create", { ubd, meta: 4, owner: ['333'] });
			await broker.call("battleStore.create", { ubd, meta: 5, owner: ['111'] });
			await broker.call("battleStore.create", { ubd, meta: 6, owner: ['222', '333'] });

			let result = await broker.call("battleStore.find", {
				query: {
					owner: {$in: ['111']}
				}
			});
			result = result.map((item) => item.meta)
			expect(result).toHaveLength(3)
			expect(result).toEqual(expect.arrayContaining([2, 3, 5]));

			result = await broker.call("battleStore.find", {
				query: {
					owner: {$in: ['222']}
				}
			});
			result = result.map((item) => item.meta)
			expect(result).toHaveLength(3)
			expect(result).toEqual(expect.arrayContaining([2, 3, 6]));

			result = await broker.call("battleStore.find", {
				query: {
					owner: {$in: ['333']}
				}
			});
			result = result.map((item) => item.meta)
			expect(result).toHaveLength(3)
			expect(result).toEqual(expect.arrayContaining([3, 4, 6]));

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

		it('should throw an error when ubd is missing or incorrect for create call', async () => {
			await expect(
				broker.call("battleStore.create", {})
			).rejects.toThrow(ValidationError);

			await expect(
				broker.call("battleStore.create", {
					ubd: ''
				})
			).rejects.toThrow(ValidationError);

			await expect(
				broker.call("battleStore.create", {
					ubd: 'a'
				})
			).rejects.toThrow(ValidationError);

			const limit = 524288;
			const longText = 'a'.repeat(limit-8);
			await expect(
				broker.call("battleStore.create", {
					ubd: `{"a":"${longText}X"}`
				})
			).rejects.toThrow(ValidationError);
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

		let broker = new ServiceBroker(require('../../utils/getLoggerSettings.js')(path.resolve(__dirname, '..', '..'), __filename, expect.getState()));
		broker.createService({
				name: 'ubdValidator',
				actions: {
				validate: () => ({valid: false, error: 'Something went wrong'})
			}
		})
		const schemaBuilder = require(__dirname + "../../../../app/services/battleStore/index.js");
		broker.createService(schemaBuilder(serviceConfig.data));

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
