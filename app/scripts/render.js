define(['d3', 'lib/knockout', 'scripts/Utils', 'dagre-d3', 'jquery', 'lettuce', 'text!templates/description.html', 'scripts/Node', 'jquery.tooltipster'],
  function (d3, ko, Utils, dagreD3, $, Lettuce, description_template, Node) {
    'use strict';
    function renderPage(skills_data) {
      function setSkillNode() {
        ko.utils.arrayForEach(skills_data.skills, function (skill) {
          var value = skill;
          value.label = skill.title;
          value.height = value.width = 40;
          value.rx = value.ry = 10;
          g.setNode(skill.title, value);
        });
      }

      function setSkillEdge() {
        ko.utils.arrayForEach(skills_data.skills, function (skill) {
          var skill_id = skill.id;
          if (skill.depends) {
            ko.utils.arrayForEach(skill.depends, function (id) {
              var dependents_name = Utils.getSkillById(skills_data.skills, id).title;
              var skill_name = Utils.getSkillById(skills_data.skills, skill_id).title;
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
      var url_hash = [];

      render(inner, g);

      var vm = new Node(g._nodes);
      ko.applyBindings(vm);

      inner.selectAll('rect')
        .attr('class', 'inner')
        .on('click', function (d, i) {
          if(vm.skills()[i].canAddPoints()){
            url_hash.push(String.fromCharCode(i + 96));
            if (vm.skills()[i].hasMultiplePoints()) {
              url_hash.push(vm.skills()[i].points());
            }
          }
          console.log(url_hash);
          if(vm.skills()[i].canAddPoints() ){
            vm.skills()[i].addPoint(1);
            d3.select(this).style('opacity', '0.7');
            d3.select(this).style('fill', '#27ae60');
          }
          if(vm.skills()[i].hasMaxPoints()){
            d3.select(this).style('fill', '#009688');
          }
        });

      inner.selectAll('g.node')
        .attr('data-bind', function(){
          return 'css: { "can-add-points": canAddPoints, "has-points": hasPoints, "has-max-points": hasMaxPoints }';
        });
      inner.selectAll('g.node rect').attr('data-bind', function () {
        return 'click: addPoint, rightClick: removePoint';
      });

      //console.log(g.node('HTML'));

      /* add tips */
      inner.selectAll('g.node')
        .each(function (v, id) {


          g.node(v).books = Utils.handleEmptyDocs(g.node(v).books);
          g.node(v).links = Utils.handleEmptyDocs(g.node(v).links);

          var data = {
            id: id,
            name: v,
            description: g.node(v).description,
            books: g.node(v).books,
            links: g.node(v).links
          };
          var results = lettuce.Template.tmpl(description_template, data);

          $(this).tooltipster({
            content: $(results),
            contentAsHTML: true,
            position: 'left',
            animation: 'grow',
            interactive: true});
          $(this).find('rect').css('fill', '#ecf0f1');
        });

      svg.attr('height', g.graph().height + 120);
    }

    return {
      renderPage: renderPage
    };
  });
