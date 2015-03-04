/* global describe, it, before */

var requirejs = require("requirejs");
var assert = require("assert");
var should = require("should");
var jsdom = require('mocha-jsdom');
var skill = require('fs').readFileSync('./test/spec/links_test.json', 'utf8');

requirejs.config({
  baseUrl: 'app/',
  nodeRequire: require
});

describe('Utils', function () {
  var Utils;
  jsdom();
  before(function (done) {
    requirejs(['scripts/Utils'],
      function (Utils_Class) {
        Utils = Utils_Class;
        done();
      });
  });
  var all_skills = JSON.parse(skill);

  describe('D3 Links Test', function () {
    it('should return correct d3 links info', function () {
      Utils.parseDepends(all_skills.skills).toString().should.equal([{source: 1, target: 0}].toString())
    });
  });
  describe('Get Skill By id', function () {
    it('should return correct skill information by id', function () {
      Utils.getSkillById(all_skills.skills, 1).toString().should.equal({ id: 1, name: 'Web' }.toString())
    });
  });
});
