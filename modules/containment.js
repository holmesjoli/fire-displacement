export class ContainmentClass {
    constructor(selector) {
        this.selector = selector
        this.width = window.innerWidth*.2
        this.height= 50
        this.margin = {top: 0, right: 10, bottom: 20, left: 10}
        this.fill = "#EE2724";
    }

    // // Initialize SVG canvas
    // createSVG() {
    //     this.svg = d3.select(this.selector)
    //         .append("svg")
    //         .attr("width", this.width)
    //         .attr("height", this.height);
    // }

    // Build the initial visualization
    draw(data, date) {

        this.svg = d3.select(this.selector)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        this.xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([this.margin.left, this.width - this.margin.right]);

        this.xAxis = this.svg
            .append("g")
            .attr("class","axis")
            .attr("transform",`translate(0, ${this.height-this.margin.bottom})`)
            .call(d3.axisBottom().scale(this.xScale).ticks(2));

        this.filterData(data, date);

        this.svg
            .selectAll("rect")
            .data(this.filteredData)
            .enter()
            .append("rect")
                .attr("x", this.xScale(0))
                .attr("y", 5)
                .attr("width", this.xScale(0))
                .attr("height", 20)
                .attr("fill", this.fill);
    }

    filterData(data, date) {
        this.filteredData = data.filter(function(d) {
            return d.date === date;
        });
    }

    createAxes() {
        this.xAxis = this.svg
            .append("g")
            .attr("class","axis")
            .attr("transform",`translate(0, ${this.height-this.margin.bottom})`)
            .call(d3.axisBottom().scale(xScale).ticks(2));
    }

    // Update the visualization with a new date
    update(data, date) {

        this.filterData(data, date);

        // console.log(this.filteredData[0].containment)

        // let b = this.svg
        //     .selectAll("rect")
        //     .data(this.filteredData, function(d) { return d.date; });

        let xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([this.margin.left, this.width - this.margin.right]);

        this.svg.append("rect")
            // .attr("x", function(d) {return xScale(d.containment); })
        //     .attr("y", 5)
        //     .attr("width", xScale(0))
        //     .attr("height", 20)
        //     .attr("fill", this.fill)
        // .merge(b)   
            // .transition()
            // .attr("x", function(d) {return xScale(d.containment_previous); })
            // .attr("width", function(d) {return xScale(d.containment); })

        // b.exit().remove();
    }
}
