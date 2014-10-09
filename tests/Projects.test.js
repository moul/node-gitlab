/* jshint node: true, expr: true, unused: false */
/* global describe, it, beforeEach, afterEach */
"use strict";

var chai = require("chai"),
	expect = chai.expect,
	proxyquire = require("proxyquire"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai");

chai.use(sinonChai);

var Projects, baseModelStub, utilsStub;

describe("Projects", function () {
	var projects;

	before(function () {
		baseModelStub = function () {};
		baseModelStub.prototype.debug = function () {};
		utilsStub = {};

		Projects = proxyquire("../lib/Models/Projects.js", {
			"../BaseModel": baseModelStub,
			"../Utils": utilsStub
		});
	});

	beforeEach(function () {
		projects = new Projects();
	});

	describe("show()", function () {
		it("should use GET verb", function () {
			var getSpy = sinon.spy();
			baseModelStub.prototype.get = getSpy;

			projects.show(1);

			expect(getSpy).to.have.been.called;
		});

		it("should parse Numeric and Namespaced projectIDs properly", function () {
			utilsStub.parseProjectId = function () {
				return "test";
			}

			var getSpy = sinon.spy();
			baseModelStub.prototype.get = getSpy;

			projects.show(1);

			expect(getSpy).to.have.been.calledWith("projects/test")
		});
	});

	describe("create()", function () {
		it("should use POST verb", function () {
			var postSpy = sinon.spy();
			baseModelStub.prototype.post = postSpy;

			projects.create({});

			expect(postSpy).to.have.been.called;
		});
	});
});