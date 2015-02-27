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
  var radius = 960 / 2;

  var cluster = d3.layout.cluster()
    .size([360, radius - 120]);

  var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

  var svg = d3.select("body").append("svg")
    .attr("width", radius * 2)
    .attr("height", radius * 2)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

  var root = {
    title: 'Skill A',
    url: 'http://skilla.com',
    children: [{
      title: 'Skill B',
      url: 'http://skillb.com',
      rating: 3,
      children: [{
        title: 'Skill D',
        url: 'http://skilld.com',
        rating: 3
      }, {
        title: 'Skill E',
        url: 'http://skilld.com',
        rating: 3,
        children: [{
          title: 'Skill E',
          url: 'http://skilld.com',
          rating: 3
        }]
      }]
    }, {
      title: 'Skill C',
      url: 'http://skillc.com',
      rating: 3
    }]
  };

  var nodes = cluster.nodes(root),
    links = cluster.links(nodes);

  console.log(nodes);

  var link = svg.selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .style("stroke-width", function (d) {
      return d.target.rating;
    })
    .attr("d", diagonal);

  var node = svg.selectAll("g.node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
    .attr("r", 20);

  node.append("text")
    .attr("dx", function (d) {
      return d.children ? -50 : 20;
    })
    .text(function (d) {
      return d.title;
    });

  d3.select(self.frameElement).style("height", radius * 2 + "px");
	//var vm = new ViewModel("Planet", "Earth");
  //ko.applyBindings(vm);
});
