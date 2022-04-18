// Draw burnt area
export function draw(svg, params, data, xBurnScale, yBurnScale) {

    let bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", function(d) {return xBurnScale(d.size)} )
        .attr("height",  function(d) {return xBurnScale(d.size)})
        .attr("fill", "#EE2724");

    let b = svg.selectAll("rect")
            .data(data, function(d) { return d.date; });

    b.transition()
        .duration(burnParams.speed)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width",  function(d) {return xBurnScale(d.size)})
        .attr("height",  function(d) {return xBurnScale(d.size)})
        .attr("fill", "#EE2724");
}



// export class ContainmentClass {
//     constructor(selector) {
//         this.selector = selector
//         this.width = window.innerWidth
//         this.height = window.innerHeight
//         this.margin = {top: 0, right: 10, bottom: 20, left: 10}
//         this.fill = "#EE2724";
//     }

//     // Build the initial visualization
//     draw(data, date) {

//         this.svg = d3.select("#containment")
//             .append("svg")
//             .attr("viewBox", `0 0 ${this.width} ${this.height}`)
//             .attr("preserveAspectRatio", "xMidYMid meet");

//         let xScale = d3.scaleLinear()
//             .domain([0, 100])
//             .range([this.margin.left, this.width - this.margin.right]);

//         this.createAxes(xScale);

//         this.filterData(data, date);

//         this.svg
//             .selectAll("rect")
//             .data(this.filteredData)
//             .enter()
//             .append("rect")
//                 .attr("x", xScale(0))
//                 .attr("y", 5)
//                 .attr("width", xScale(0))
//                 .attr("height", 20)
//                 .attr("fill", this.fill);
//     }

//     filterData(data, date) {
//         this.filteredData = data.filter(function(d) {
//             return d.date === date;
//         });
//     }

//     createAxes(xScale) {
//         this.xAxis = this.svg
//             .append("g")
//             .attr("class","axis")
//             .attr("transform",`translate(0, ${this.height-this.margin.bottom})`)
//             .call(d3.axisBottom().scale(xScale).ticks(2));
//     }

//     // Update the visualization with a new date
//     update(data, date) {

//         this.filterData(data, date);

//         // console.log(this.filteredData[0].containment)

//         // let b = this.svg
//         //     .selectAll("rect")
//         //     .data(this.filteredData, function(d) { return d.date; });

//         // let xScale = d3.scaleLinear()
//         //     .domain([0, 100])
//         //     .range([this.margin.left, this.width - this.margin.right]);

//         this.svg.append("rect")
//             // .attr("x", function(d) {return xScale(d.containment); })
//         //     .attr("y", 5)
//         //     .attr("width", xScale(0))
//         //     .attr("height", 20)
//         //     .attr("fill", this.fill)
//         // .merge(b)   
//             // .transition()
//             // .attr("x", function(d) {return xScale(d.containment_previous); })
//             // .attr("width", function(d) {return xScale(d.containment); })

//         // b.exit().remove();
//     }
// }
