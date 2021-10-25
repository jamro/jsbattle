"use strict";
const Node = require('../../app/Node.js');
const axios = require('axios');
const { ServiceBroker } = require("moleculer");
const path = require('path');
const PORT = 8772
const BASE_URL = `http://localhost:${PORT}`

describe("Test DB Dump & Restore", () => {
	let gateway;
	beforeEach(async () => {
		gateway = new Node('cli_db');
		await gateway.init({
			...(require('../utils/getLoggerSettings.js')(path.resolve(__dirname, '..'), __filename, expect.getState())),
			skipEnv: true
		});
		await gateway.start();
	});

	afterEach(async () => {
		await gateway.stop();
	});

	it('should dump and restore data', async () => {

		const dumpPath = path.resolve(__dirname, '..', 'tmp', 'dump' + Math.round(Math.random()*0xffffffff).toString(16))
		
		await gateway.broker.call('battleStore.create', {
			ubd: '{"version": 1, "rngSeed": 0, "aiList": [{"name": "a", "team": "a", "code": "//", "initData": {}, "useSandbox": false, "executionLimit": 1000}, {"name": "b", "team": "b", "code": "//", "initData": {}, "useSandbox": false, "executionLimit": 1000}]}'
		});
		const list1 = await gateway.broker.call('battleStore.find')
		await gateway.broker.call('cli.dumpDb', {dumpPath})
		await new Promise(d => setTimeout(d, 321))
		await gateway.broker.call('cli.restoreDb', {dumpPath})
		const list2 = await gateway.broker.call('battleStore.find');
		expect(list1[0].createdAt.toISOString()).toBe(list2.find(i => i.id === list1[0].id).createdAt.toISOString());
	});
});

