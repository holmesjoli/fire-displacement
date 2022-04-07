export class ContainmentClass {
    constructor(selector) {
        this.selector = selector
        this.width = window.innerWidth*.2
        this.height= 50
        this.margin = {top: 0, right: 10, bottom: 20, left: 10}
    }

    // Initialize SVG canvas
    createSVG() {
        this.svg = d3.select(this.selector)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
    }

    // Build the initial visualization
    draw(data) {
        this.createSVG();
        this.createScales();
        this.createAxes();

        this.svg
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", this.xScale(0))
                .attr("y", 5)
                .attr("width", this.xScale(0))
                .attr("height", 20)
                .attr("fill", "#EE2724");
    }

    createScales() {
        this.xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([this.margin.left, this.width - this.margin.right]);
    }

    createAxes() {
        this.xAxis = this.svg
            .append("g")
            .attr("class","axis")
            .attr("transform",`translate(0, ${this.height-this.margin.bottom})`)
            .call(d3.axisBottom().scale(this.xScale).ticks(2));
    }

    // Update the visualization with a new date
    update(data, date) {

        // console.log(this.xScale(10))
        let filteredData = data.filter(function(d) {
            return d.date === date;
        });

        // let b = this.svg.selectAll("rect")
        //     .data(filteredData, function(d) { return d.date; });

        // b.transition() // a transition makes the changes visible...
        // .duration(1500)
        // .attr("width", function(d) {this.xScale(d.containment); })

        // b.exit().remove();
    }
}
