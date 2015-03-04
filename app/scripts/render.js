define(['d3', 'lib/knockout', 'scripts/Utils', 'dagre-d3', 'jquery','lettuce', 'jquery.tipsy'],
  function (d3, ko, Utils, dagreD3, $, Lettuce) {
    'use strict';
    function renderPage(skills_data) {
      var lettuce = new Lettuce();
      var g = new dagreD3.graphlib.Graph().setGraph({});

      ko.utils.arrayForEach(skills_data.skills, function (skill) {
        var value = skill;
        value.label = skill.name;
        value.rx = value.ry = 5;
        g.setNode(skill.name, value);
      });

      ko.utils.arrayForEach(skills_data.skills, function (skill) {
        var skill_id = skill.id;
        if (skill.depends) {
          ko.utils.arrayForEach(skill.depends, function (id) {
	          var dependents_name = skills_data.skills[id - 1].name;
	          var skill_name = skills_data.skills[skill_id - 1].name;
            g.setEdge(dependents_name, skill_name, {label: '',lineInterpolate: 'basis'});
          });
        }
      });

      var render = new dagreD3.render();

      var svg = d3.select('svg'),
        inner = svg.append('g');
      //
      //var zoom = d3.behavior.zoom().on("zoom", function () {
      //  inner.attr("transform", "translate(" + d3.event.translate + ")" +
      //  "scale(" + d3.event.scale + ")");
      //});
      //svg.call(zoom);

      render(inner, g);

      inner.selectAll('g.node')
        .attr('title', function (v) {
          var data = {
            name: v,
            description: g.node(v).description
          };
		      var results = lettuce.Template.tmpl('<p class="name">{%=o.name%}</p><p class="description">{%=o.description%}</p>', data);
            return results;
        })
        .each(function (v) {
          $(this).tipsy({gravity: 's', opacity: 1, html: true});
        });

      var initialScale = 1;
      //zoom
      //  .translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 120])
      //  .scale(initialScale)
      //  .event(svg);
      svg.attr('height', g.graph().height * initialScale + 120);
    }

    return {
      renderPage: renderPage
    };
  });
