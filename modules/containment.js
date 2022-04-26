// Draw containment percentage
export function draw(svg, params, xScale, data) {

    let bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .attr("x", params.margin.left)
        .attr("y", 0)
        .attr("class", "containment")
        .attr("width", function(d) {return xScale(d.containment)} )
        .attr("height", params.barHeight)
        .attr("fill", "#473F41");

    let b = svg.selectAll(".containment")
            .data(data, function(d) { return d.date; });

    b.transition()
    .duration(params.speed)
    .ease(d3.easeLinear)
    .attr("x", params.margin.left)
    .attr("y", 0)
    .attr("class", "containment")
    .attr("width", function(d) {return xScale(d.containment)} )
    .attr("height", params.barHeight)
    .attr("fill", "#473F41");
}
