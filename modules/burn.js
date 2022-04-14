export function createSVG(width, height, data) {
    const svg = d3.select("#burn")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const margin = {top: 10, right: 10, bottom: 10, left: 10};

    const extent = d3.extent(data, function(d) {return d.date;})

    let scaleR = d3.scaleSqrt()
        .domain([extent[0], extent[1]])
        .range([margin.left, width - margin.left])

    svg
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", scaleR(extent[1]))
        .attr("height", scaleR(extent[1]))
        .attr("fill", "#EE2724")
        .attr("stroke", "#473F41")

}

export function initialSize(data) {

}