export function updateBurn(svg, margin, rScale, dataInitial, dataUpdate) {

    let rect = svg.selectAll("rect")
        .data(dataInitial)
        .enter()
        .append("rect")
            .attr("x", margin)
            .attr("y", margin)
            .attr("class", "burn")
            .attr("width", function(d) { return rScale(d.size); })
            .attr("height", function(d) { return rScale(d.size); })
            .attr("fill", "#EE2724");

    let r = svg.selectAll(".burn")
        .data(dataUpdate, function(d) {return d.date;});
    
        r
        .enter()
        .append("rect")
            .attr("x", margin)
            .attr("y", margin)
            .attr("height", function(d) { return rScale(d.size); })
            .attr("width", function(d) { return rScale(d.size); })
            .attr("fill", "#EE2724")
        .merge(r)
            .transition()
            .duration(1000)
            .delay(1000)
            .attr("x", margin)
            .attr("y", margin)
            .attr("height", function(d) { return rScale(d.size); })
            .attr("width", function(d) { return rScale(d.size); })
            .attr("fill", "#EE2724");
    
        r.exit()
            .transition()
            .duration(1000)
            .delay(1000)
            .attr("width", 0)
            .attr("height", 0)
            .remove();

//     svg
//         .append("rect")
//         .attr("x", margin)
//         .attr("y", margin)
//         .attr("width", rScale(data[0].size) - margin)
//         .attr("height", rScale(data[0].size) - margin)
//         .attr("fill", "#FFFFFF")
//         .attr("stroke", "#473F41")
}
