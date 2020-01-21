"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;

describe("Test 'UserStore' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.serviceConfig = { auth: { admins: [{provider: 'google', username: 'monica83' }] } };
	broker.loadService(__dirname + "../../../app/services/UserStore.service.js");

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	it('should create new user', async () => {
		const EXT_ID = 'facebook_8392742';
		let result = await broker.call('userStore.find', {query: {
      extUserId: EXT_ID
    }});
		expect(result).toHaveLength(0);
		await broker.call("userStore.findOrCreate", {user: {
			extUserId: EXT_ID,
			username: 'joe',
			provider: 'facebook'
		}});
		result = await broker.call('userStore.find', {query: {
      extUserId: EXT_ID
    }});
		expect(result).toHaveLength(1);
		let user = result[0];
		expect(user.extUserId).toBe(EXT_ID);
		expect(user).toHaveProperty('username', 'joe');
		expect(user).toHaveProperty('role', 'user');
		expect(user).toHaveProperty('provider', 'facebook');
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
