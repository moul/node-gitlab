chai = require 'chai'
expect = chai.expect
proxyquire = require 'proxyquire'
Utils = require '../lib/Utils.js'

describe "Utils", ->
	describe "parseProjectId", ->
		it "should return a Number if passed a Number", ->
			expect(Utils.parseProjectId 0).to.be.a 'number'

		it "should URI encode strings containing '/'", ->
			expect(Utils.parseProjectId "/abc").to.equal '%2Fabc'
			expect(Utils.parseProjectId "a/bc").to.equal 'a%2Fbc'
			expect(Utils.parseProjectId "ab/c").to.equal 'ab%2Fc'
			expect(Utils.parseProjectId "abc/").to.equal 'abc%2F'

		it "should return NaN for unparseable strings without '/'", ->
			expect(isNaN Utils.parseProjectId "abc").to.be.true

		it "should return a Number for parseable strings without '/'", ->
			expect(Utils.parseProjectId "1").to.equal 1
