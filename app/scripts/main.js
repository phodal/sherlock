require.config({
  baseUrl: 'app',
  paths: {
    jquery: 'lib/jquery',
    json: 'lib/json',
    d3: 'lib/d3',
    text: 'lib/text'
  }
});

require(['lib/knockout', 'scripts/Talent', 'scripts/render', 'json!../data/example.json'],
  function (ko, Talent, render, example) {
    'use strict';

    render.renderPage(example);

    var vm = new Talent(example);
    ko.applyBindings(vm);
  });
