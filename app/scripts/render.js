define(['d3', 'lib/knockout', 'text!templates/example.html'], function (d3, ko, example) {
  function renderPage(skills_data) {

    var links =[];

    ko.utils.arrayForEach(skills_data.skills, function (node) {
      var skill_id = node.id;
      if(node.depends !== undefined){
        ko.utils.arrayForEach(node.depends, function (id) {
	        var link = {
            "source": skill_id - 1,
            "target": id - 1
          };
          links.push(link);
        });
      }
    });

    var w = 960,
      h = 500;

    var vis = d3.select("body").append("svg:svg")
      .attr("width", w)
      .attr("height", h);

    var force = self.force = d3.layout.force()
      .nodes(skills_data.skills)
      .links(links)
      .gravity(.05)
      .distance(100)
      .charge(-100)
      .size([w, h])
      .start();

    var link = vis.selectAll("line.link")
      .data(links)
      .enter().append("svg:line")
      .attr("class", "link")
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    var node = vis.selectAll("g.node")
      .data(skills_data.skills)
      .enter().append("svg:g")
      .attr("class", "node");

    node.append("svg:text")
      .attr("class", "nodetext")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("data-bind", function () {
        return "click: sample";
      })
      .text(function (d) {
        return d.name
      });

    node.append("foreignObject")
      .attr("width", 280)
      .attr("height", 500)
      .style("font", "14px 'Helvetica Neue'");
      //.html(example);

    node.append("circle")
      .attr("r", 4.5);

    force.on("tick", tick);

    function tick() {
      link.attr("x1", function (d) {
        return d.source.x;
      })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }
  }

  return {
    renderPage: renderPage
  }
});
