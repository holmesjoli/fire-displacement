// Main map function
export function build(selector, stateBoundaries) {

    // make the SVG and viewbox
    const svg = d3.select(selector)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .style("background-color", "#fff")
        .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        .attr("id", "map-svg")
        .classed("svg-content", true);

    // define the settings for map projection
    const projection = d3.geoMercator()
        .translate([window.innerWidth / 2, window.innerHeight / 2])
        .scale(250)
        .center([0, 0]);

    // create the geo path generator
    let geoPathGenerator = d3.geoPath().projection(projection);

    const g = svg.append("g");

    var basemap = g
        .selectAll("path")
        .data(stateBoundaries.features)
        .enter()
        .append("path")
        .attr("class", 'continent')
        // draw each country
        .attr("d", geoPathGenerator)
        .attr("country", function (d) { return d.id })
        // set the color of each country
        .attr("stroke", "#FFFFFF")
        .attr("fill", "#D7D7D7");

    var zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', function (event) {
            // console.log(event)
            g.attr("transform", "translate(" + event.transform.x + "," + event.transform.y + ")scale(" + event.transform.k + ")");
            // updateCircles(data, event.transform.k)
        });

    // call zoom so it is "listening" for an event on our SVG
    svg.call(zoom);

}
