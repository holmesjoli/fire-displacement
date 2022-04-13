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

    draw(stateBoundaries, data, shelters, date) {

        // let filteredData = data.filter(function(d) {
        //     return d.date === date;
        // });
        // console.log(filteredData);

        this.createSVG();

        this.createProjection();

        this.drawBasemap(stateBoundaries.features)

        this.createShelters(shelters)

        // var zoom = d3.zoom()
        //     .scaleExtent([1, 1000])
        //     .on('zoom', function (event) {
        //         g.attr("transform", "translate(" + event.transform.x + "," + event.transform.y + ")scale(" + event.transform.k + ")");
        //     });

        // // call zoom so it is "listening" for an event on our SVG
        // svg.call(zoom);
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
        .style("background-color", "#fff")
        // .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        // .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        .attr("id", "map-svg")
        .classed("svg-content", true);
    }

    createProjection(data) {

        this.projection = d3.geoAlbers()
            .translate([this.width / 2, this.height / 2])
            .scale(this.initialScale)
            .center([this.initialCenterX, this.initialCenterY]);

        this.geoPathGenerator = d3.geoPath().projection(this.projection);
    }

    drawBasemap(data) {
        this.svg
            .append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("class", 'state')
            .attr("d", this.geoPathGenerator)
            .attr("country", function (d) { return d.id })
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 1)
            .attr("fill", "#D7D7D7");
    }

    createShelters(data) {

        let projection = d3.geoAlbers()
            .translate([this.width / 2, this.height / 2])
            .scale(this.initialScale)
            .center([this.initialCenterX, this.initialCenterY]);

        console.log(data);

        var points = this.svg
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 5)
            .attr("fill", "orange")
            .attr("fill-opacity", 1)
            .attr("stroke", "grey");
    }
}
