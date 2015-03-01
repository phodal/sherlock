define(['lib/knockout'], function(ko) {
  'use strict';
  function parseDepends(skills) {
    var links = [];
    ko.utils.arrayForEach(skills, function (node) {
      var skill_id = node.id;
      if (node.depends !== undefined) {
        ko.utils.arrayForEach(node.depends, function (id) {
          var link = {
            'source': skill_id - 1,
            'target': id - 1
          };
          links.push(link);
        });
      }
    });
    return links;
  }
  return {
    parseDepends: parseDepends
  };
});
