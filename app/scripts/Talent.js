define(['lib/knockout'], function (ko) {
  'use strict';

  var Talent = function (_e) {
    var self = this;
    self.stats = [{
      title: 'world',
      value: 'hello'
    }];
    self.sample = function () {
      console.log("click");
    };
  };

  return Talent;
});


