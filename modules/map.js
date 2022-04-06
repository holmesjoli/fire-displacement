// Main map function
export function build(selector, stateBoundaries, data) {

    const width = window.innerWidth*.55;
    const height = window.innerHeight*.85;

    let filteredData = data[0];

    // make the SVG and viewbox
    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("preserveAspectRatio", "xMinYMin meet")
        .style("background-color", "#fff")
        // .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        // .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        .attr("id", "map-svg")
        .classed("svg-content", true);

    // define the settings for map projection
    const projection = d3.geoAlbers()
        .translate([width / 2, height / 2])
        .scale(filteredData.scale)
        .center([filteredData.centerX, filteredData.centerY]);

    // create the geo path generator
    let geoPathGenerator = d3.geoPath().projection(projection);

    const g = svg.append("g");

    var basemap = g
        .selectAll("path")
        .data(stateBoundaries.features)
        .enter()
        .append("path")
        .attr("class", 'continent')
        .attr("d", geoPathGenerator)
        .attr("country", function (d) { return d.id })
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", 1)
        .attr("fill", "#D7D7D7");

    // var zoom = d3.zoom()
    //     .scaleExtent([1, 1000])
    //     .on('zoom', function (event) {
    //         g.attr("transform", "translate(" + event.transform.x + "," + event.transform.y + ")scale(" + event.transform.k + ")");
    //     });

    // // call zoom so it is "listening" for an event on our SVG
    // svg.call(zoom);
}

export function update(data, date) {

    const projection = d3.geoAlbers()
        .translate([width / 2, height / 2])
        .scale(7000)
        .center([-25, 46]);

    // create the geo path generator
    let geoPathGenerator = d3.geoPath().projection(projection);

    var basemap = g
        .transition()
        .attr("d", geoPathGenerator)
}
