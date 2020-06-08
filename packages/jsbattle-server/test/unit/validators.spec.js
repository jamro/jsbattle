"use strict";

const validators = require("../../app/validators");

describe("Test 'Validators' definition", () => {

	for(let name in validators) {

		it(`should overide properties of '${name}' validator`, async () => {
			let def = validators[name]({type: 'type9987764', foo6453: "bar7892"});
			expect(def).toHaveProperty('type', 'type9987764')
			expect(def).toHaveProperty('foo6453', 'bar7892')
		});
	}

});
