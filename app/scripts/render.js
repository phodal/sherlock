define(['d3', 'lib/knockout','scripts/Utils', 'text!templates/example.html'], function (d3, ko, Utils, example) {
  'use strict';
  function renderPage(skills_data) {
    var links = Utils.parseDepends(skills_data.skills);
    var w = 960,
      h = 500;

    var vis = d3.select('body').append('svg:svg')
      .attr('width', w)
      .attr('height', h);

    var force = d3.layout.force()
      .nodes(skills_data.skills)
      .links(links)
      .gravity(0.05)
      .distance(100)
      .charge(-100)
      .size([w, h])
      .start();

    var link = vis.selectAll('line.link')
      .data(links)
      .enter().append('svg:line')
      .attr('class', 'link')
      .attr('x1', function (d) {
        return d.source.x;
      })
      .attr('y1', function (d) {
        return d.source.y;
      })
      .attr('x2', function (d) {
        return d.target.x;
      })
      .attr('y2', function (d) {
        return d.target.y;
      });

    var node = vis.selectAll('g.node')
      .data(skills_data.skills)
      .enter().append('svg:g')
      .attr('class', 'node');

    node.append('svg:text')
      .attr('class', 'nodetext')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .attr('data-bind', function () {
        return 'click: sample';
      })
      .text(function (d) {
        return d.name;
      });

    node.append('foreignObject')
      .attr('width', 280)
      .attr('height', 500)
      .style('font', '14px "Helvetica Neue"');
      //.html(example);

    node.append('circle')
      .attr('r', 4.5);

    function tick() {
      link.attr('x1', function (d) {
        return d.source.x;
      })
        .attr('y1', function (d) {
          return d.source.y;
        })
        .attr('x2', function (d) {
          return d.target.x;
        })
        .attr('y2', function (d) {
          return d.target.y;
        });

      node.attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    }

    force.on('tick', tick);
  }

  return {
    renderPage: renderPage
  };
});
