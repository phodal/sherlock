require.config({
  baseUrl: 'app',
  paths:{
    jquery: 'lib/jquery',
    json: 'lib/json',
    d3: 'lib/d3',
    text: 'lib/text'
  }
});

require(['lib/knockout', 'd3'], function(ko, d3) {
  'use strict';
  var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);

    this.fullName = ko.pureComputed(function() {
      return this.firstName() + " " + this.lastName();
    }, this);
  };
  d3.select("body").append("h1").text("Successfully loaded D3 version " + d3.version);
	var vm = new ViewModel("Planet", "Earth");
  ko.applyBindings(vm);
});
