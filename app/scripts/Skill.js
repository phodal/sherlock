define(['lib/knockout', 'scripts/Book', 'scripts/Link'],
  function (ko, Book, Link) {
    'use strict';
    var Skill = function (_e) {
      var e = _e || {};
      var self = this;

      self.id = e.id || 0;
      self.title = e.title || 'Unknown Skill';
      self.description = e.description;
      self.points = ko.observable(e.points || 0);
        self.books = ko.utils.arrayMap(e.books, function (item) {
          return new Book(item);
        });
      self.links = ko.utils.arrayMap(e.links, function (item) {
        return new Link(item);
      });
    };

    return Skill;
  });
