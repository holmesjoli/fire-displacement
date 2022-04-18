export function draw(svgBurn, burnParams, data, xBurnScale, yBurnScale) {

    let bar = svgBurn.selectAll("rect")
        .data(data)
        .enter()
        .attr("x", burnParams.margin)
        .attr("y", burnParams.margin)
        .attr("width", function(d) {return xBurnScale(d.size)} )
        .attr("height",  function(d) {return xBurnScale(d.size)})
        .attr("fill", "#EE2724")

    let b = svgBurn.selectAll("rect")
            .data(data, function(d) { return d.date; });

    b.transition()
        .duration(burnParams.speed)
        .attr("x", burnParams.margin)
        .attr("y", burnParams.margin)
        .attr("width",  function(d) {return xBurnScale(d.size)})
        .attr("height",  function(d) {return xBurnScale(d.size)})
        .attr("fill", "#EE2724");
}
