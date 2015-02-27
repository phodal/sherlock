define(['d3', 'lib/knockout'], function (d3, ko) {
  function renderPage(skills_data) {
    var radius = 960 / 2;
    var cluster = d3.layout.cluster()
      .size([360, radius - 120]);
    var diagonal = d3.svg.diagonal.radial()
      .projection(function (d) {
        return [d.y, d.x / 180 * Math.PI];
      });
    var svg = d3.select("body").append("svg")
      .attr("width", radius * 2)
      .attr("height", radius * 2)
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");
    var root = skills_data;
    var nodes = cluster.nodes(root),
      links = cluster.links(nodes);
    var link = svg.selectAll(".link")
      .data(links)
      .enter().append("path")
      .attr("class", "link")
      .style("stroke-width", function (d) {
        //return d.target.rating;
        return 3;
      })
      .attr("d", diagonal);
    var node = svg.selectAll("g.node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")rotate(" + (-d.x + 90) + ")";
      });
    node.append("circle")
      .attr("r", 2);
    node.append("text")
      .attr("dx", function (d) {
        return d.children ? -50 : 20;
      })
      .attr("class", "skill")
      .attr("data-bind", function () {
        return "click: sample";
      })
      .text(function (d) {
        return d.title;
      });
    d3.select(self.frameElement).style("height", radius * 2 + "px");
  }

  return {
    renderPage: renderPage
  }
});
