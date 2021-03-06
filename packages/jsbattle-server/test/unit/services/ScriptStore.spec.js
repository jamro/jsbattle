"use strict";

const serviceConfig = require('../../../app/lib/serviceConfig.js');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const crypto = require("crypto");
const path = require('path');

const createTestToken = (user) => ({
	id: (user ? user.id : '') || "123456",
	username: (user ? user.username : '') || "amy",
	role: (user ? user.role : '') || "user",
})
describe("Test 'ScriptStore' service", () => {

	describe("unregistered user", () => {
		let broker;
		beforeEach(async () => {
			serviceConfig.extend({ auth: { admins: [{provider: 'google', username: 'monica83' }] } });
			broker = new ServiceBroker(require('../../utils/getLoggerSettings.js')(path.resolve(__dirname, '..', '..'), __filename, expect.getState()));
			broker.createService({
					name: 'userStore',
					actions: {
						get: () => ({
							username: 'john',
							registered: false
						})
					}
			})
			const schemaBuilder = require(__dirname + "../../../../app/services/scriptStore/index.js");
			broker.createService(schemaBuilder(serviceConfig.data));
			await broker.start()
		});
		afterEach(() => broker.stop());

		it('should not create user script',  async () => {
			const user = {
				username: 'john',
				role: 'user',
				id: '92864'
			}
			expect(
				broker.call('scriptStore.createUserScript', {scriptName: 'alha345'}, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(/must finish registration process/)
		});
	});

	describe("registered user", () => {
		let broker;

		beforeEach(async () => {
			serviceConfig.extend({ auth: { admins: [{provider: 'google', username: 'monica83' }] } });
			broker = new ServiceBroker({ logger: false });
			broker.createService({
					name: 'userStore',
					actions: {
						get: () => ({
							username: 'john',
							registered: true
						})
					}
			})
			const schemaBuilder = require(__dirname + "../../../../app/services/scriptStore/index.js");
			broker.createService(schemaBuilder(serviceConfig.data));
			await broker.start();
		});

		afterEach(() => broker.stop());

		it('should create user script',  async () => {
			const user = {
				username: 'john',
				role: 'user',
				id: '92864'
			}
			let result = await broker.call('scriptStore.createUserScript', {scriptName: 'beta8978'}, {meta: {user: createTestToken(user)}});
			expect(result).toHaveProperty('ownerId', user.id);
			expect(result).toHaveProperty('ownerName', user.username);
			expect(result).toHaveProperty('namespace', 'user');
			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('code');
			expect(result).toHaveProperty('scriptName');
			expect(result).toHaveProperty('createdAt');
			expect(result).toHaveProperty('modifiedAt');
		});

		it('should create hash of code',  async () => {
			const code = "// some code 34523451";
			const codeHash = crypto.createHash('md5').update(code).digest("hex");
			const user = {
				username: 'john',
				role: 'user',
				id: '92864',
			}

			let result = await broker.call('scriptStore.createUserScript', {scriptName: 'beta8978', code: code}, {meta: {user: createTestToken(user)}});
			expect(result).toHaveProperty('code', code);
			expect(result).toHaveProperty('hash', codeHash);

			result = await broker.call('scriptStore.getUserScript', {id: result.id}, {meta: {user: createTestToken(user)}});
			expect(result).toHaveProperty('code', code);
			expect(result).toHaveProperty('hash', codeHash);
		});

		it('should list user scripts',  async () => {
			const user = {
				username: 'john',
				role: 'user',
				id: '92864'
			}
			await broker.call('scriptStore.createUserScript', {scriptName: 'phi3254'}, {meta: {user: createTestToken(user)}});
			await broker.call('scriptStore.createUserScript', {scriptName: 'psi2747'}, {meta: {user: createTestToken(user)}});
			await broker.call('scriptStore.createUserScript', {scriptName: 'psi1234'}, {meta: {user: createTestToken(user)}});
			let result = await broker.call('scriptStore.listUserScripts', {}, {meta: {user: createTestToken(user)}});
			expect(result).toHaveLength(3);
		});

		it('should update user scripts',  async () => {
			const newCode = '// new hello world8934572345';
			const codeHash = crypto.createHash('md5').update(newCode).digest("hex");
			const user = {
				username: 'john',
				role: 'user',
				id: '92864'
			}
			let script = await broker.call(
				'scriptStore.createUserScript',
				{
					code: '// hello world1235',
					scriptName: 'helloScript'
				},
				{meta: {user: createTestToken(user)}}
			);
			let updatedScript = await broker.call('scriptStore.updateUserScript', {id: script.id, code: newCode}, {meta: {user: createTestToken(user)}});
			expect(updatedScript).toHaveProperty('id', script.id);
			expect(updatedScript).toHaveProperty('scriptName', 'helloScript');
			expect(updatedScript).toHaveProperty('ownerId', script.ownerId);
			expect(updatedScript).toHaveProperty('ownerName', script.ownerName);
			expect(updatedScript).toHaveProperty('code', newCode);
			expect(updatedScript).toHaveProperty('createdAt', script.createdAt);
			expect(updatedScript).toHaveProperty('modifiedAt');
			expect(updatedScript).toHaveProperty('hash', codeHash);
		});

		it('should get user script',  async () => {
			const user = {
				username: 'john',
				role: 'user',
				id: '92864'
			}
			let result = await broker.call('scriptStore.createUserScript', {scriptName: 'pi0983'}, {meta: {user: createTestToken(user)}});
			result = await broker.call('scriptStore.getUserScript', {id: result.id}, {meta: {user: createTestToken(user)}});
			expect(result).toHaveProperty('ownerId', user.id);
			expect(result).toHaveProperty('ownerName', user.username);
			expect(result).toHaveProperty('namespace', 'user');
			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('code');
			expect(result).toHaveProperty('scriptName');
			expect(result).toHaveProperty('createdAt');
			expect(result).toHaveProperty('modifiedAt');
		});

		it('should delete user script',  async () => {
			const user = {
				username: 'john',
				role: 'user',
				id: '92864'
			}
			await broker.call('scriptStore.createUserScript', {scriptName: 'gamma665'}, {meta: {user: createTestToken(user)}});
			let result = await broker.call('scriptStore.createUserScript', {scriptName: 'gamma563'}, {meta: {user: createTestToken(user)}});
			await broker.call('scriptStore.deleteUserScript', {id: result.id}, {meta: {user: createTestToken(user)}});
			result = await broker.call('scriptStore.listUserScripts', {}, {meta: {user: createTestToken(user)}});
			expect(result).toHaveLength(1);
		});

	});
});
