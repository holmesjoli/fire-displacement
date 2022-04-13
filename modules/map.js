export class MapClass {
    constructor(selector) {
        this.selector = selector
        this.width = window.innerWidth*.7
        this.height= window.innerHeight*.97
        this.margin = {top: 0, right: 10, bottom: 20, left: 10}
        this.initialScale = 7000
        this.initialCenterX = -25
        this.initialCenterY = 47
    }

    draw(stateBoundaries, countyBoundaries, shelters, cities) {

        console.log(shelters)
        console.log(cities)

        let tooltip = this.tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");

        let projection = d3.geoAlbers()
            .translate([this.width / 2, this.height / 2])
            .scale(this.initialScale)
            .center([this.initialCenterX, this.initialCenterY]);

        this.createSVG();

        this.drawBasemap(stateBoundaries.features, projection);
        this.drawBasemap(countyBoundaries.features, projection);
        this.createShelters(shelters, tooltip, projection);
        this.createCities(cities, tooltip, projection);
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

    drawBasemap(data, projection) {

        let geoPathGenerator = d3.geoPath().projection(projection);
    
        this.svg
            .append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("class", 'state')
            .attr("d", geoPathGenerator)
            .attr("country", function (d) { return d.id })
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 1)
            .attr("fill", "#D7D7D7");
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

    createShelters(data, tooltip, projection) {

        let points = this.svg
            .append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "shelters")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 5)
            .attr("fill", "#EE2724");

        this.mouseoverPoints(points, tooltip);
    }

    createCities(data, tooltip, projection) {

        let points = this.svg
            .append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "cities")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 2)
            .attr("fill", "#000000");

        this.mouseoverPoints(points, tooltip);
    }
}
