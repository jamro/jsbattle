"use strict";

const serviceConfig = require('../../../app/lib/serviceConfig.js');
const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const path = require('path');

const updateUserChallenge = jest.fn();
const createUserScript = jest.fn();

const createTestToken = (user) => ({
	id: (user ? user.id : '') || "123456",
	username: (user ? user.username : '') || "amy",
	role: (user ? user.role : '') || "user",
})

describe("Test 'UserStore' service", () => {
	serviceConfig.extend({ auth: { admins: [{provider: 'google', username: 'monica83' }] } });
	let broker = new ServiceBroker(require('../../utils/getLoggerSettings.js')(path.resolve(__dirname, '..', '..'), __filename, expect.getState()));
	broker.createService({
		name: 'auth',
		actions: {
			whoami: () => ({

			})
		}
	})
	broker.createService({
		name: 'challenges',
		actions: {
			updateUserChallenge: updateUserChallenge
		}
	})
	broker.createService({
		name: 'scriptStore',
		actions: {
			createUserScript: createUserScript
		}
	})
	const schemaBuilder = require(__dirname + "../../../../app/services/userStore/index.js");
	broker.createService(schemaBuilder(serviceConfig.data));

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("find or create user", () => {

		it.each([
			['facebook_8392742', 'facebook', 'joe'],
			['adam-2345.452#5!', 'github', 'adam-super-star'],
			['1234567890123456789012345678901234567890', 'google', '12345678901234567890123456789012'],
		])('should create new user', async (extId, provider, username) => {
			let result = await broker.call('userStore.find', {query: {
	      extUserId: extId
	    }});
			expect(result).toHaveLength(0);
			await broker.call("userStore.findOrCreate", {user: {
				extUserId: extId,
				username: username,
				provider: provider
			}});
			result = await broker.call('userStore.find', {query: {
	      extUserId: extId
	    }});
			expect(result).toHaveLength(1);
			let user = result[0];
			expect(user.extUserId).toBe(extId);
			expect(user).toHaveProperty('username', username);
			expect(user).toHaveProperty('role', 'user');
			expect(user).toHaveProperty('provider', provider);
		});

		it.each([
			['facebook_9871700', 'facebook', 'joe@joe.com'],
			['facebook_4323422', 'facebook', '123@a.b'],
			['facebook_5432244', 'facebook', 'long.multi.dot.name@long.multi.dot.domain'],
			['facebook_7550123', 'facebook', 'some_special-chars@some_special-chars.com'],
			['facebook_1988321', 'facebook', 'CapitalChars@Capital.Chars'],
		])('should pass valid email address', async (extId, provider, email) => {
			let result = await broker.call('userStore.find', {query: {
	      extUserId: extId
	    }});
			expect(result).toHaveLength(0);
			await broker.call("userStore.findOrCreate", {user: {
				extUserId: extId,
				email: email,
				provider: provider
			}});
			result = await broker.call('userStore.find', {query: {
	      extUserId: extId
	    }});
			expect(result).toHaveLength(1);
			let user = result[0];
			expect(user.extUserId).toBe(extId);
			expect(user).toHaveProperty('email', email);
			expect(user).toHaveProperty('role', 'user');
			expect(user).toHaveProperty('provider', provider);
		});

		it('should reuse existing user', async () => {
			const EXT_ID = 'facebook_8843948534';
			await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'joe',
				provider: 'facebook'
			}});
			let result = await broker.call('userStore.find', {query: {
				extUserId: EXT_ID
			}});
			let user1 = result[0];
			await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'joe',
				provider: 'facebook'
			}});
			result = await broker.call('userStore.find', {query: {
				extUserId: EXT_ID
			}});
			let user2 = result[0];
			expect(user1.userId).toBe(user1.userId)
		});

		it('should create admin user', async () => {
			const EXT_ID = 'google_9847202345';
			await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'monica83',
				provider: 'google'
			}});
			let result = await broker.call('userStore.find', {query: {
				extUserId: EXT_ID
			}});
			expect(result).toHaveLength(1);
			let user = result[0];
			expect(user).toHaveProperty('role', 'admin');
		});

		it('should throw an error when user is missing for findOrCreate call', async () => {
			expect(
				broker.call("userStore.findOrCreate", {})
			).rejects.toThrow(ValidationError)
		});

		it('should throw an error when user is incomplete for findOrCreate call', async () => {
			expect(
				broker.call("userStore.findOrCreate", {user: {
					username: 'joe',
					provider: 'facebook'
				}})
			).rejects.toThrow(ValidationError);
			expect(
				broker.call("userStore.findOrCreate", {user: {
					extUserId: '123',
					provider: 'facebook'
				}})
			).rejects.toThrow(ValidationError);
			expect(
				broker.call("userStore.findOrCreate", {user: {
					extUserId: '123',
					username: 'joe',
				}})
			).rejects.toThrow(ValidationError);
		});

	});

	describe("update user", () => {
		it('should update user', async () => {
			const EXT_ID = 'google_31244325234';
			let result = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'monicaaa',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				registered: false,
				role: 'user'
			}});
			result = await broker.call('userStore.update', {
				id: result.id,
				username: 'monica',
				displayName: "Monica Allo",
				email: "monica@gmail.com",
				registered: true
			});
			result = await broker.call('userStore.get', {id: result.id});
			expect(result).toBeDefined();
			expect(result).toHaveProperty('extUserId', EXT_ID);
			expect(result).toHaveProperty('username', 'monica');
			expect(result).toHaveProperty('displayName', 'Monica Allo');
			expect(result).toHaveProperty('email', 'monica@gmail.com');
			expect(result).toHaveProperty('provider', 'google');
			expect(result).toHaveProperty('role', 'user');
			expect(result).toHaveProperty('registered', true);
		});

		it('should not update read-only fields', async () => {
			const EXT_ID = 'google_5423234252';
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'monicaaa',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				registered: false,
				role: 'user'
			}});
			let result = await broker.call('userStore.update', {
				id: user.id,
				extUserId: '3',
				provider: 'facebook',
				createdAt: new Date(1000000000000),
			});
			result = await broker.call('userStore.get', {id: result.id});
			expect(result).toBeDefined();
			expect(result).toHaveProperty('extUserId', EXT_ID);
			expect(result).toHaveProperty('provider', 'google');
			expect(result).toHaveProperty('createdAt', user.createdAt);
		});

	});

	describe("register user", () => {

		it('register user with default name', async () => {
			const EXT_ID = 'google_59203452244';
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'monicaaa',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				registered: false,
				role: 'user'
			}});
			let result = await broker.call(
				"userStore.register",
				{},
				{meta: {user: createTestToken(user)}}
			);
			result = await broker.call('userStore.get', {id: user.id});
			expect(result).toBeDefined();
			expect(result).toHaveProperty('registered', true);
			expect(result).toHaveProperty('username', "monicaaa");
			expect(result).toHaveProperty('displayName', "Monica Allegro");
		});

		it('register user with custom name', async () => {
			const EXT_ID = 'google_2348905432';
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'monicaaa',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				registered: false,
				role: 'user'
			}});
			let result = await broker.call(
				"userStore.register",
				{
					username: "mon_a",
					displayName: "Allegro Allegro"
				},
				{meta: {user: createTestToken(user)}}
			);
			result = await broker.call('userStore.get', {id: user.id});
			expect(result).toBeDefined();
			expect(result).toHaveProperty('registered', true);
			expect(result).toHaveProperty('username', "mon_a");
			expect(result).toHaveProperty('displayName', "Allegro Allegro");
		});

		it('should throw an error when registering invalid name', async () => {
			const EXT_ID = 'google_9873428871';
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'monic_823832',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				registered: false,
				role: 'user'
			}});
			await expect(
				broker.call("userStore.register", { username: 'x' }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
			await expect(
				broker.call("userStore.register", { displayName: 'x' }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
			await expect(
				broker.call("userStore.register", { username: 'alpha beta' }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
			await expect(
				broker.call("userStore.register", { username: 'alpha&beta' }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
			await expect(
				broker.call("userStore.register", { displayName: 'Alpha !& Beta' }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
		});

		it('should throw an error when registering twice', async () => {
			const EXT_ID = 'google_97667003033';
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID,
				username: 'monic_84433',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				role: 'user'
			}});

			await broker.call("userStore.register", { }, {meta: {user: createTestToken(user)}})

			expect(
				 broker.call("userStore.register", { }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
		});

		it('should throw an error when registering duplicated username', async () => {
			const EXT_ID_1 = 'google_78923452345';
			const EXT_ID_2 = 'google_23459644432';
			let user1 = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID_1,
				username: 'monic_84433',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				role: 'user'
			}});
			let user2 = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID_2,
				username: 'monic_84433',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				role: 'user'
			}});

			await broker.call("userStore.register", { username: 'monic_888724' }, {meta: {user: createTestToken(user1)}})

			await expect(
				 broker.call("userStore.register", { username: 'monic_888724' }, {meta: {user: createTestToken(user2)}})
			).rejects.toThrow(ValidationError);

		});

		it('should throw an error when registering reserved username', async () => {
			const EXT_ID_1 = 'google_78923452345';
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: EXT_ID_1,
				username: 'monic_84433',
				provider: 'google',
				displayName: "Monica Allegro",
				email: "monica@example.com",
				role: 'user'
			}});

			await expect(
				 broker.call("userStore.register", { username: 'jsbattle' }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
			await expect(
				 broker.call("userStore.register", { username: 'admin' }, {meta: {user: createTestToken(user)}})
			).rejects.toThrow(ValidationError);
		});

		it('submit challenge data when registering', async () => {
			updateUserChallenge.mockReset();
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: 'google_306464422',
				username: 'alfred9854',
				provider: 'google',
				displayName: "Alfred Allegro",
				email: "alf@example.com",
				registered: false,
				role: 'user'
			}});
			let result = await broker.call(
				"userStore.register",
				{
					challenges: [
						{
							challengeId: "challenge-11123423",
							completed: true,
							code: "// code 12345"
						},
						{
							challengeId: "challenge-222425",
							completed: false,
							code: "// code 2345452"
						}
					]
				},
				{meta: {user: createTestToken(user)}}
			);

			expect(updateUserChallenge.mock.calls).toHaveLength(2);
			expect(updateUserChallenge.mock.calls[0][0].params).toHaveProperty('challengeId', "challenge-11123423");
			expect(updateUserChallenge.mock.calls[0][0].params).toHaveProperty('completed', true);
			expect(updateUserChallenge.mock.calls[0][0].params).toHaveProperty('code', "// code 12345");
			expect(updateUserChallenge.mock.calls[1][0].params).toHaveProperty('challengeId', "challenge-222425");
			expect(updateUserChallenge.mock.calls[1][0].params).toHaveProperty('completed', false);
			expect(updateUserChallenge.mock.calls[1][0].params).toHaveProperty('code', "// code 2345452");
		});

		it('submit scripts data when registering', async () => {
			createUserScript.mockReset();
			let user = await broker.call("userStore.findOrCreate", {user: {
				extUserId: 'google_67345',
				username: 'book2495',
				provider: 'google',
				displayName: "Book Mack",
				email: "bm@example.com",
				registered: false,
				role: 'user'
			}});
			let result = await broker.call(
				"userStore.register",
				{
					scripts: [
						{
							scriptName: 'pink',
							code: "// pink code"
						},
						{
							scriptName: 'blue',
							code: "// blue code"
						}
					]
				},
				{meta: {user: createTestToken(user)}}
			);

			expect(createUserScript.mock.calls).toHaveLength(2);
			expect(createUserScript.mock.calls[0][0].params).toHaveProperty('scriptName', "pink");
			expect(createUserScript.mock.calls[0][0].params).toHaveProperty('code', "// pink code");
			expect(createUserScript.mock.calls[1][0].params).toHaveProperty('scriptName', "blue");
			expect(createUserScript.mock.calls[1][0].params).toHaveProperty('code', "// blue code");
		});

	})
});
