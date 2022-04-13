export class MapClass {
    constructor(selector) {
        this.selector = selector
        this.width = window.innerWidth*.7
        this.height= window.innerHeight*.97
        this.margin = {top: 0, right: 10, bottom: 20, left: 10}
        this.initialScale = 40000
        this.initialCenterX = -23.5
        this.initialCenterY = 48.5
    }

    draw(stateBoundaries, countyBoundaries, okBigStreets, okMedStreets, okSmallStreets, countyHouses, shelters, cities) {

        let tooltip = this.tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");

        let projection = d3.geoAlbers()
            .translate([this.width / 2, this.height / 2])
            .scale(this.initialScale)
            .center([this.initialCenterX, this.initialCenterY]);

        this.geoPathGenerator = d3.geoPath().projection(projection);

        this.createSVG();

        this.drawBasemap(stateBoundaries.features);
        this.drawBasemap(countyBoundaries.features);
        this.drawBasemap(okBigStreets.features, "#000000", 3);
        this.drawBasemap(okMedStreets.features, "#000000", 2);
        this.drawBasemap(okSmallStreets.features, "#000000", .5);
        this.createPoints(shelters, tooltip, projection, "shelters", "#EE2724", 5);
        this.createPoints(cities, tooltip, projection, "cities", "#000000", 2);
        this.createPoints(countyHouses, tooltip, projection, "homes", "#00AEEF", 2);
    }

    // update(data, date) {

    //     let filteredData = data.filter(function(d) {
    //         return d.date === date;
    //     });

    //     this.createProjection(filteredData[0]);

    //     this.geoPathGenerator = d3.geoPath()
    //         .projection(this.projection);

    //     this.g
    //         .transition()
    //         .attr("d", this.geoPathGenerator)
    // }

    // Initialize SVG canvas
    createSVG() {
        this.svg = d3.select(this.selector)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        // .attr("preserveAspectRatio", "xMinYMin meet")
        // .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        // .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        .attr("id", "map-svg")
        .classed("svg-content", true);
    }

    drawBasemap(data, stroke = "#FFFFFF", strokeWidth = 1) {
        this.svg
            .append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("class", 'state')
            .attr("d", this.geoPathGenerator)
            .attr("country", function (d) { return d.id })
            .attr("stroke", stroke)
            .attr("stroke-width", strokeWidth)
            .attr("fill", "#D7D7D7")
            .attr("opacity", .5);
    }

    mouseoverPoints(p, tooltip) {

        p.on("mouseover", function(e, d) {

            let x = +d3.select(this).attr("cx") + 20;
            let y = +d3.select(this).attr("cy") - 10;
    
            tooltip.style("visibility", "visible")
                .style("top", `${y}px`)
                .style("left", `${x}px`)
                .html(`<b>${d.name}</b>`);

        }).on("mouseout", function() {
            tooltip.style("visibility", "hidden");
        });
    }

    createPoints(data, tooltip, projection, className, fill, r) {
        let points = this.svg
            .append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", className)
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", r)
            .attr("fill", fill);

        this.mouseoverPoints(points, tooltip);
    }
}
