define(['d3', 'lib/knockout', 'scripts/Utils', 'dagre-d3', 'jquery','lettuce', 'jquery.tipsy'],
  function (d3, ko, Utils, dagreD3, $, Lettuce) {
    'use strict';
    function renderPage(skills_data) {
      function setSkillNode() {
        ko.utils.arrayForEach(skills_data.skills, function (skill) {
          var value = skill;
          value.label = skill.name;
          value.height = value.width = 60;
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
      g.nodes().forEach(function(v) {
        var node = g.node(v);
        console.log(node);
      });

      var render = new dagreD3.render();

      var svg = d3.select('svg'),
        inner = svg.append('g');

      render(inner, g);
      console.log(inner.selectAll('g.node'));

      inner.selectAll('g.node')
        .on( "click", function( d, i) {
          console.log(d, i)
          var e = d3.event,
            g = this,
            isSelected = d3.select(g).classed( "selected");

          if( !e.ctrlKey) {
            d3.selectAll( 'g.selected').classed( "selected", false);
          }

          d3.select( g).classed( "selected", !isSelected);
          g.parentNode.appendChild(g);
        })
        .on("mouseover", function(){
          d3.select(this).style( "fill", "red");
        })
        .on("mouseout", function() {
          d3.select(this).style("fill", "black");
        });

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
