define(['lib/knockout', 'scripts/Skill'], function (ko, Skill) {
  'use strict';

  var Talent = function (_e) {
    var self = this;
    self.stats = [{
      title: 'world',
      value: 'hello'
    }];
    self.skills = ko.observableArray(ko.utils.arrayMap(_e.children, function (item) {
      return new Skill(item);
    }));
    self.sample = function () {
      console.log('click');
    };
  };

  return Talent;
});


