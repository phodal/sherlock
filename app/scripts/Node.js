define(['lib/knockout', 'scripts/Book', 'scripts/Link', 'scripts/Skill', 'jquery', 'underscore'],
  function (ko, Book, Link, Skill, $, _) {
    'use strict';
    var Node = function (nodes) {
      var self = this;

      self.skills = ko.observableArray(ko.utils.arrayMap(_.toArray(nodes), function (item) {
	      var skill = new Skill(item);
        return skill;
      }));
    };

    return Node;
  });
