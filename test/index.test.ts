import assert from "node:assert/strict";
import { describe, it } from "node:test";
import simplifyNumber from "../src/index.js";

describe("simplifyNumber", () => {
	it("converts thousands", () => {
		assert.equal(simplifyNumber(1_000), "1k");
		assert.equal(simplifyNumber(10_000), "10k");
		assert.equal(simplifyNumber(11_000), "11k");
		assert.equal(simplifyNumber(100_000), "100k");
	});

	it("converts millions", () => {
		assert.equal(simplifyNumber(1_000_000), "1m");
		assert.equal(simplifyNumber(10_000_000), "10m");
		assert.equal(simplifyNumber(100_000_000), "100m");
	});

	it("converts billions", () => {
		assert.equal(simplifyNumber(1_000_000_000), "1b");
		assert.equal(simplifyNumber(10_000_000_000), "10b");
		assert.equal(simplifyNumber(100_000_000_000), "100b");
	});

	it("converts trillions", () => {
		assert.equal(simplifyNumber(1_000_000_000_000), "1t");
		assert.equal(simplifyNumber(10_000_000_000_000), "10t");
		assert.equal(simplifyNumber(100_000_000_000_000), "100t");
	});

	it("supports custom abbreviations", () => {
		assert.equal(simplifyNumber(1000, { abbreviations: ["rb"] }), "1rb");
	});

	it("supports 2 decimal places by default", () => {
		assert.equal(simplifyNumber(11_111), "11.11k");
	});

	it("supports custom decimal places", () => {
		assert.equal(simplifyNumber(11_111, { decimal: 0 }), "11k");
		assert.equal(simplifyNumber(11_111, { decimal: 1 }), "11.1k");
		assert.equal(simplifyNumber(11_111, { decimal: 2 }), "11.11k");
		assert.equal(simplifyNumber(11_111, { decimal: 3 }), "11.111k");
	});
});
