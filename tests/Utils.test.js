(function() {
  var Utils, chai, expect, proxyquire;

  chai = require('chai');

  expect = chai.expect;

  proxyquire = require('proxyquire');

  Utils = require('../lib/Utils.js');

  describe("Utils", function() {
    return describe("parseProjectId", function() {
      it("should return a Number if passed a Number", function() {
        return expect(Utils.parseProjectId(0)).to.be.a('number');
      });
      it("should URI encode strings containing '/'", function() {
        expect(Utils.parseProjectId("/abc")).to.equal('%2Fabc');
        expect(Utils.parseProjectId("a/bc")).to.equal('a%2Fbc');
        expect(Utils.parseProjectId("ab/c")).to.equal('ab%2Fc');
        return expect(Utils.parseProjectId("abc/")).to.equal('abc%2F');
      });
      it("should return NaN for unparseable strings without '/'", function() {
        return expect(isNaN(Utils.parseProjectId("abc"))).to.be["true"];
      });
      return it("should return a Number for parseable strings without '/'", function() {
        return expect(Utils.parseProjectId("1")).to.equal(1);
      });
    });
  });

}).call(this);
