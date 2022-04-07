export class MapClass {
    constructor(selector) {
        this.selector = selector
        this.width = window.innerWidth*.55
        this.height= window.innerHeight*.85
        this.margin = {top: 0, right: 10, bottom: 20, left: 10}
        this.initialScale = 7000
        this.initialCenterX = -25
        this.initialCenterY = 47
    }

    draw(stateBoundaries, data, date) {
    
        this.createSVG();

        let filteredData = data.filter(function(d) {
            return d.date === date;
        });
        console.log(filteredData);

        this.createProjection(filteredData[0]);

        this.g = this.svg.append("g");

        this.g
            .selectAll("path")
            .data(stateBoundaries.features)
            .enter()
            .append("path")
            .attr("class", 'continent')
            .attr("d", this.geoPathGenerator)
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

    // update(data, date) {

    //     this.projection = d3.geoAlbers()
    //         .translate([this.width / 2, this.height / 2])
    //         .scale(7000)
    //         .center([-25, 46]);

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
            .scale(data.scale)
            .center([data.centerX, data.centerY]);

        this.geoPathGenerator = d3.geoPath().projection(this.projection);
    }
}
