"use strict";
const Gateway = require('../../app/Gateway.js');
const UbdJsonMock = require('../mock/UbdJsonMock');
const axios = require('axios');

const PORT = 8772
const BASE_URL = `http://localhost:${PORT}`

describe("Test Share Battle API", () => {

	let gateway;

	beforeAll(async () => {
		gateway = new Gateway();
		await gateway.init({
			loglevel: 'none',
			skipEnv: true,
			web: {
				port: PORT,
				corsOrigin: ["*"]
			}
		});
		await gateway.start();
	});

	afterAll(async () => {
		await gateway.stop();
	});

	it('should share the battle', async () => {
		const ubd = new UbdJsonMock();
		const ubdText = JSON.stringify(ubd)
		let wrteResponse = await axios.post(`${BASE_URL}/api/battleReplay`, {ubd: ubdText});
		expect(wrteResponse.status).toBe(200);
		expect(wrteResponse.data).toBeDefined();
		expect(wrteResponse.data.id).toBeDefined();
		expect(wrteResponse.data.ubd).toBeDefined();
		expect(wrteResponse.data.createdAt).toBeDefined();
		let createTime = new Date(wrteResponse.data.createdAt).getTime();
		let now = new Date().getTime();
		expect(Math.abs(createTime - now) < 5000).toBe(true);

		let readResponse = await axios.get(`${BASE_URL}/api/battleReplay/${wrteResponse.data.id}`);
		expect(readResponse.status).toBe(200);
		expect(readResponse.data).toBeDefined();
		expect(readResponse.data.id).toBe(wrteResponse.data.id);
		expect(readResponse.data.ubd).toBe(wrteResponse.data.ubd);
		expect(readResponse.data.createdAt).toBe(wrteResponse.data.createdAt);
  });

	it('should return error on invalid ubd', async () => {
		const ubd = new UbdJsonMock();
		ubd.version = -1;
		const ubdText = JSON.stringify(ubd)
		let wrteResponse = await axios.post(`${BASE_URL}/api/battleReplay`, {ubd: ubdText}, {validateStatus: false});
		expect(wrteResponse.status).toBe(422);

  });

});
