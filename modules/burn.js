// export function setupSVG(width = 100, margin, sizeExtent, rScale) {
//     const svg = d3.select("#burn")
//         .append("svg")
//         .attr("viewBox", `0 0 ${width} ${width}`)
//         .attr("preserveAspectRatio", "xMidYMid meet");

//     svg
//         .append("rect")
//         .attr("x", margin)
//         .attr("y", margin)
//         .attr("width", rScale(sizeExtent[1]) - margin)
//         .attr("height", rScale(sizeExtent[1])- margin)
//         .attr("fill", "#FFFFFF")
//         .attr("stroke", "#473F41");
// }

export function updateBurn(svg, width, margin, rScale, dataInitial, dataUpdate) {

    let rect = svg.selectAll("rect")
        .data(dataInitial)
        .enter()
        .append("rect")
            .attr("x", margin)
            .attr("y", margin)
            .attr("class", "burn")
            .attr("width", function(d) { return rScale(d.size) - margin; })
            .attr("height", function(d) { return rScale(d.size) - margin; })
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
