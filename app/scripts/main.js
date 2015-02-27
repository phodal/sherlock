require.config({
  baseUrl: 'app',
  paths: {
    jquery: 'lib/jquery',
    json: 'lib/json',
    d3: 'lib/d3',
    text: 'lib/text'
  }
});

require(['lib/knockout', 'scripts/Talent', 'scripts/render', 'json!../data/data.json'],
  function (ko, Talent, render, skills_data) {
    'use strict';

    render.renderPage(skills_data);

    var vm = new Talent();
    ko.applyBindings(vm);
  });
