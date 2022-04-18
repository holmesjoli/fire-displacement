// Draw burnt area
export function draw(svg, params, data, xScale, yScale) {

    let bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width", function(d) {return xScale(d.size)} )
        .attr("height",  function(d) {return xScale(d.size)})
        .attr("fill", "#EE2724");

    let b = svg.selectAll("rect")
            .data(data, function(d) { return d.date; });

    b.transition()
        .duration(params.speed)
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width",  function(d) {return xScale(d.size)})
        .attr("height",  function(d) {return xScale(d.size)})
        .attr("fill", "#EE2724");
}
