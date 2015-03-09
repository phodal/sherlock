define(['d3', 'lib/knockout', 'scripts/Utils', 'dagre-d3', 'jquery', 'lettuce', 'text!templates/description.html', 'json!../../data/colors.json', 'jquery.tooltipster'],
  function (d3, ko, Utils, dagreD3, $, Lettuce, description_template, colors) {
    'use strict';
    function renderPage(skills_data) {
      function setSkillNode() {
        ko.utils.arrayForEach(skills_data.skills, function (skill) {
          var value = skill;
          value.label = skill.name;
          value.height = value.width = 40;
          value.rx = value.ry = 10;
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

      var render = new dagreD3.render();
      var svg = d3.select('svg');

      var inner = svg.append('g');

      render(inner, g);

      inner.selectAll('rect')
        .attr('class', 'inner');

      inner.selectAll('g.node')
        .attr('data-bind', function(){
          return 'css: { \'can-add-points\': canAddPoints, \'has-points\': hasPoints, \'has-max-points\': hasMaxPoints }';
        });
      inner.selectAll('g.node rect').attr('data-bind', function () {
        return 'click: addPoint, rightClick: removePoint';
      });

      /* add tips */
      inner.selectAll('g.node')
        .each(function (v, id) {
          var data = {
            id: id,
            name: v,
            description: g.node(v).description,
            books: g.node(v).books,
            links: g.node(v).links
          };
          var results = lettuce.Template.tmpl(description_template, data);
          $(this).tooltipster({content: $(results), contentAsHTML: true, interactive: true});
          $(this).find('rect').css("fill", colors[id]['font_color']);
        });

      svg.attr('height', g.graph().height + 120);
    }

    return {
      renderPage: renderPage
    };
  });
