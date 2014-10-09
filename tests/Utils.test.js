/* jshint node: true, expr: true, unused: false */
/* global describe, it, beforeEach, afterEach */
"use strict";

var chai = require("chai"),
	expect = chai.expect,
	proxyquire = require("proxyquire"),
	Utils = require("../lib/Utils.js")

describe("Utils", function () {
	describe("parseProjectId", function () {
		it("should return a Number if passed a Number", function () {
			expect(Utils.parseProjectId(0)).to.be.a('number');
		});

		it("should URI encode strings containing '/'", function () {
			expect(Utils.parseProjectId("/abc")).to.equal('%2Fabc');
			expect(Utils.parseProjectId("a/bc")).to.equal('a%2Fbc');
			expect(Utils.parseProjectId("ab/c")).to.equal('ab%2Fc');
			expect(Utils.parseProjectId("abc/")).to.equal('abc%2F');
		});

		it("should return NaN for unparseable strings without '/'", function () {
			expect(isNaN(Utils.parseProjectId("abc"))).to.be.true;
		});

		it("should return a Number for parseable strings without '/'", function () {
			expect(Utils.parseProjectId("1")).to.equal(1);
		});
	});
});