export function createSVG(width, height, data) {
    const svg = d3.select("#burn")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const margin = 10;

    const extent = d3.extent(data, function(d) {return d.date;})

    let scaleR = d3.scaleSqrt()
        .domain([extent[0], extent[1]])
        .range([margin, width - margin])

    svg
        .append("rect")
        .attr("x", margin)
        .attr("y", margin)
        .attr("width", scaleR(extent[1]) - margin)
        .attr("height", scaleR(extent[1])- margin)
        .attr("fill", "#FFFFFF")
        .attr("stroke", "#473F41")

}

export function initialSize(data) {

}