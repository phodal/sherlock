require.config({
  baseUrl: 'app',
  paths: {
    jquery: 'lib/jquery-2.1.3',
    json: 'lib/json',
    d3: 'lib/d3.min',
    'dagre-d3': 'lib/dagre-d3.min',
    text: 'lib/text',
    lettuce: 'lib/lettuce',
    'jquery.tipsy': 'lib/jquery.tipsy'
  },
  'shim': {
    'jquery.tipsy': {
      deps: ['jquery']
    },
    'dagre-d3': {
      deps: ['d3']
    }
  }
});

require(['lib/knockout', 'scripts/Talent', 'scripts/render', 'json!../data/example.json'],
  function (ko, Talent, render, example) {
    'use strict';

    render.renderPage(example);

    var vm = new Talent(example);
    ko.applyBindings(vm);
  });
