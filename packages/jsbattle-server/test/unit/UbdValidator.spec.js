"use strict";

const ConfigBroker = require("../../app/lib/ConfigBroker.js");
const { ValidationError } = require("moleculer").Errors;
const UbdJsonMock = require('../mock/UbdJsonMock');

describe("Test 'UbdValidator' service", () => {
	let broker = new ConfigBroker({ logger: false }, {}, false);
	broker.loadService(__dirname + "../../../app/services/UbdValidator.service.js");

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('schema ver 1', function() {

    it('should pass on proper UBDv1', async () => {
			const ubd = new UbdJsonMock(1);
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(true);
			expect(response.error).toBeUndefined();
    });

    it('should fail on invalid UBDv1', async () => {
			const ubd = new UbdJsonMock(1);
			ubd.rngSeed = "INVALID_VALUE";
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(false);
			expect(response.error).toBeDefined();
			expect(response.error).toMatch(/rngSeed should be number/);
    });

  });

  describe('schema ver 2', function() {

    it('should pass on proper UBDv2', async () => {
			const ubd = new UbdJsonMock(2);
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(true);
			expect(response.error).toBeUndefined();
    });

    it('should fail on invalid UBDv2', async () => {
			const ubd = new UbdJsonMock(2);
			ubd.rngSeed = "INVALID_VALUE";
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(false);
			expect(response.error).toBeDefined();
			expect(response.error).toMatch(/rngSeed should be number/);
    });

  });


  describe('schema ver 3', function() {

    it('should pass on proper UBDv3', async () => {
			const ubd = new UbdJsonMock(3);
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(true);
			expect(response.error).toBeUndefined();
    });

    it('should fail on invalid UBDv3', async () => {
			const ubd = new UbdJsonMock(2);
			ubd.rngSeed = "INVALID_VALUE";
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(false);
			expect(response.error).toBeDefined();
			expect(response.error).toMatch(/rngSeed should be number/);
    });

  });

	describe('error handling', function() {

		it('should throw error when ubd not provided', async () => {
			expect(
		    broker.call("ubdValidator.validate", {})
		  ).rejects.toThrow(ValidationError)
		});

		it('should fail when ubd is not a valid JSON', async () => {
			const ubd = "NON-JSON-DATA"
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(false);
			expect(response.error).toBeDefined();
			expect(response.error).toMatch(/not valid JSON/);
		});

		it('should fail when ubd version is not supported', async () => {
			const ubd = new UbdJsonMock(0);
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(false);
			expect(response.error).toBeDefined();
			expect(response.error).toMatch(/not supported/);
		});

		it('should fail when ubd version is not provided', async () => {
			const ubd = new UbdJsonMock(0);
			ubd.version = undefined;
			const response = await broker.call("ubdValidator.validate", {ubd: ubd});
			expect(response.valid).toBe(false);
			expect(response.error).toBeDefined();
			expect(response.error).toMatch(/not supported/);
		});

	});

});
