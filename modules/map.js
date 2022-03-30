// Main map function
export function build(selector) {

    // make the SVG and viewbox
    const svg = d3.select(selector)
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .style("background-color", "#fff")
        .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        .attr("id", "map-svg")
        .classed("svg-content", true);

    // define the settings for map projection
    const projection = d3.geoEqualEarth()
        .translate([window.innerWidth / 2, window.innerHeight / 2])
        .scale(250)
        .center([0, 0]);

    // create the geo path generator
    let geoPathGenerator = d3.geoPath().projection(projection);
}
