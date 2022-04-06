// Title Build containment visual
// Param selector the id for the contaiment container
// Param data the 
export function build(selector, data) {

    const width = window.innerWidth*.2;
    const height = 50;

    let filteredData = [data[0]];
    console.log(filteredData);

    let svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var margin = {top: 0, right: 10, bottom: 20, left: 10}

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d.containment;
        })])
        .range([margin.left, width - margin.right]);

    const xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale).ticks(2));

    svg.selectAll("rect")
        .data(filteredData)
        .enter()
        .append("rect")
            .attr("x", xScale(0))
            .attr("y", 5)
            .attr("width", function(d) { return xScale(d.containment); })
            .attr("height", 20)
            .attr("fill", "#EE2724");

    return svg
}

export function update(svg, data, xScale, date) {

    let filteredData = data.filter(function(d) {
        return d.date === date;
    })

    let b = svg.selectAll("rect")
        .data(filteredData, function(d) { return d.date; });

    b.enter().append("rect")
    .attr("x", xScale(0))
    .attr("y", 5)
    .attr("width", function(d) { return xScale(d.containment); })
    .attr("height", 20)
    .attr("fill", "#EE2724")
    .merge(b)   
        .transition() // a transition makes the changes visible...
        .duration(1000)
        .attr("x", xScale(0))
        .attr("y", 5)
        .attr("width", function(d) { return xScale(d.containment); })
        .attr("height", 20)
        .attr("fill", "#EE2724");

    b.exit()
    .remove();
}