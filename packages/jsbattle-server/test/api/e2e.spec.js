"use strict";
const Node = require('../../app/Node.js');
const axios = require('axios');
const { ServiceBroker } = require("moleculer");

const PORT = 8772
const BASE_URL = `http://localhost:${PORT}`

describe("End to end API scenarios", () => {

	describe("Guest", () => {
		let gateway;
		beforeEach(async () => {
			gateway = new Node();
			await gateway.init({
				loglevel: 'none',
				skipEnv: true,
				web: {
					port: PORT,
					corsOrigin: ["*"]
				},
				auth: {
					providers: [
						{
							name: 'mock'
						}
					]
				}
			});
			await gateway.start();
		});

		afterEach(async () => {
			await gateway.stop();
		});

		it('should join the league', async () => {
			let authResponse = await axios.get(`${BASE_URL}/auth/mock?format=json`);
			let token = authResponse.data.token;
			let httpConfig = {
				headers: {
	      	'Authorization': 'Bearer ' + token
		    }
			}

			await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock32',
				displayName: 'Mock 32',
				challenges: [],
				scripts: []
			}, httpConfig);

			let profileResponse = await axios.get(`${BASE_URL}/api/profile`, httpConfig);

			let scriptResponse = await axios.post(`${BASE_URL}/api/user/scripts`, {}, httpConfig);
			let scriptId = scriptResponse.data.id;
			let testCode = 'importScripts("lib/tank.js");tank.init(function(settings, info) {});tank.loop(function(state, control) {control.SHOOT=1;});';
			await axios.patch(`${BASE_URL}/api/user/scripts/${scriptId}`, {
				scriptName: 'mytest63',
				code: testCode
			}, httpConfig);

			scriptResponse = await axios.get(`${BASE_URL}/api/user/scripts/${scriptId}`, httpConfig);

			expect(scriptResponse.data).toHaveProperty('code', testCode);

			let submissionResponse = await axios.patch(`${BASE_URL}/api/user/league/submission`, {scriptId}, httpConfig);
			let response = await axios.get(`${BASE_URL}/api/user/league`, httpConfig);

			expect(response.data).toMatchObject({
	      submission: {
					id: submissionResponse.data.submission.id,
	        scriptId: scriptId,
	        ownerId: profileResponse.data.id,
	        ownerName: profileResponse.data.username,
	        scriptName: 'mytest63',
	        hash: scriptResponse.data.hash,
	        latest: true
				}
		  });

			let leagueScriptResponse = await axios.get(`${BASE_URL}/api/user/league/scripts/${submissionResponse.data.submission.id}`, httpConfig);

			expect(leagueScriptResponse.data).toMatchObject({
	      id: submissionResponse.data.submission.id,
				scriptName: "mock32/mytest63"
		  });

		});

		it('should store init user data when registering', async () => {
			let authResponse = await axios.get(`${BASE_URL}/auth/mock?format=json`);
			let token = authResponse.data.token;
			let httpConfig = {
				headers: {
					'Authorization': 'Bearer ' + token
				}
			}

			await axios.patch(`${BASE_URL}/api/user/initData`, {
				username: 'mock54',
				displayName: 'Mock 54',
				challenges: [
					{
			      "challengeId": "challenge-8UCUaNvC",
			      "code": "console.log(\"hello world\")",
			      "completed": true
			    },
					{
						"challengeId": "challenge-Du7tyrCB",
						"code": "console.log(\"hello world 2\")",
						"completed": false
					}
				],
				scripts: [
					{
			      "scriptName": "alpha",
			      "code": "console.log(\"hello world from alpha\")"
			    }
				]
			}, httpConfig);

			let profileResponse = await axios.get(`${BASE_URL}/api/profile`, httpConfig);

			let scriptResponse = await axios.get(`${BASE_URL}/api/user/scripts`, httpConfig);
			expect(scriptResponse.data).toHaveLength(1);
			expect(scriptResponse.data).toEqual(expect.arrayContaining([expect.objectContaining({
				ownerId: profileResponse.data.id,
        ownerName: 'mock54',
        scriptName: 'alpha',
			})]))

			let scriptDetailsResponse = await axios.get(`${BASE_URL}/api/user/scripts/${scriptResponse.data[0].id}`, httpConfig);
			expect(scriptDetailsResponse.data).toHaveProperty('code', "console.log(\"hello world from alpha\")")

			let challengesResponse = await axios.get(`${BASE_URL}/api/user/challenges`, httpConfig);
			expect(challengesResponse.data).toHaveLength(2);
			expect(challengesResponse.data).toEqual(expect.arrayContaining([expect.objectContaining({
				challengeId: 'challenge-8UCUaNvC',
				completed: true
			})]));
			expect(challengesResponse.data).toEqual(expect.arrayContaining([expect.objectContaining({
				challengeId: 'challenge-Du7tyrCB',
				completed: false
			})]));

			let challengeDetailsResponse1 = await axios.get(`${BASE_URL}/api/user/challenges/challenge-8UCUaNvC`, httpConfig);
			let challengeDetailsResponse2 = await axios.get(`${BASE_URL}/api/user/challenges/challenge-Du7tyrCB`, httpConfig);

			expect(challengeDetailsResponse1.data).toHaveProperty('code', "console.log(\"hello world\")");
			expect(challengeDetailsResponse2.data).toHaveProperty('code', "console.log(\"hello world 2\")");

		});

	});

});
