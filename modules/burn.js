// Draw burnt area
export function draw(svg, params, xScale, yScale, data) {

    let bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width", function(d) {return xScale(d.size)} )
        .attr("height",  function(d) {return xScale(d.size)})
        .attr("fill", "#473F41");

    let b = svg.selectAll(".burn")
            .data(data, function(d) { return d.date; });

    b.transition()
        .duration(params.speed)
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width",  function(d) {return xScale(d.size)})
        .attr("height",  function(d) {return xScale(d.size)})
        .attr("fill", "#473F41");
}
