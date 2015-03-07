define(['d3', 'lib/knockout', 'scripts/Utils', 'dagre-d3', 'jquery', 'lettuce', 'jquery.tipsy'],
  function (d3, ko, Utils, dagreD3, $, Lettuce) {
    'use strict';
    function renderPage(skills_data) {
      function setSkillNode() {
        ko.utils.arrayForEach(skills_data.skills, function (skill) {
          var value = skill;
          value.label = skill.name;
          value.height = value.width = 40;
          value.rx = value.ry = 5;
          g.setNode(skill.name, value);
        });
      }

      function setSkillEdge() {
        ko.utils.arrayForEach(skills_data.skills, function (skill) {
          var skill_id = skill.id;
          if (skill.depends) {
            ko.utils.arrayForEach(skill.depends, function (id) {
              var dependents_name = Utils.getSkillById(skills_data.skills, id).name;
              var skill_name = Utils.getSkillById(skills_data.skills, skill_id).name;
              g.setEdge(dependents_name, skill_name, {label: '', lineInterpolate: 'basis'});
            });
          }
        });
      }

      var lettuce = new Lettuce();
      var g = new dagreD3.graphlib.Graph().setGraph({});
      setSkillNode();
      setSkillEdge();
      g.nodes().forEach(function (v) {
        var node = g.node(v);
        //console.log(node);
      });

      var render = new dagreD3.render();
      var svg = d3.select('svg');

      /* append image */
      g.nodes().forEach(function (v) {
        var node = g.node(v);
        if( node.logo){
          svg.append('defs')
            .append('pattern')
            .attr('id', node.id)
            .attr('width', 60)
            .attr('height', 60)
            .append('svg:image')
            .attr('xlink:href', './app/logo/' + node.logo)
            .attr('width', 60)
            .attr('height', 60)
            .attr('x', 0)
            .attr('y', 0);
        }
      });

      var inner = svg.append('g');

      render(inner, g);

      inner.selectAll('rect')
        .attr('class', 'inner');

      /* fill background */
      var rect = inner.selectAll('g.node')
        .attr('data-bind', function(){
          return 'css: { \'can-add-points\': canAddPoints, \'has-points\': hasPoints, \'has-max-points\': hasMaxPoints }';
        });

      rect.style('fill', function (d, i) {
        var node = g.node(d);
        if(node.logo) {
          console.log(node);
          return 'url(#' + node.id + ')' ;
        }
        return '';
      }).attr('data-bind', function () {
        return 'click: addPoint, rightClick: removePoint';
      });

      /* add tips */
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

      svg.attr('height', g.graph().height + 120);
    }

    return {
      renderPage: renderPage
    };
  });
