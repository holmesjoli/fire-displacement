import * as Helper from './modules/helper_functions.js';
import * as Map from './modules/map.js';
import * as Containment from "./modules/containment.js"


const files = {
    stateBoundaries: {
        pth: "./data/state_boundaries.geojson",
        parse: null
    },

    complex: {
        pth: "./data/complex_data.csv",
        parse: function(j) {
            return {
                air_support: +j.air_support,
                containment: +j.containment,
                day: +j.day,
                engines: +j.engines,
                home_place: +j.home_place,
                i: +j.i,
                month: +j.month,
                month_name: j.month_name,
                date: j.date,
                n_homes: +j.n_homes,
                n_structures: +j.n_structures,
                overhead_personnel: +j.overhead_personnel,
                size: +j.size,
                total_personnel: +j.total_personnel,
                scale: +j.scale,
                centerX: +j.centerX,
                centerY: +j.centerY
            }
        }
    }
};

let promises = [];

for (var key of Object.keys(files)) {
    var fl = files[key];
    Helper.read(fl.pth, fl.parse, promises);
}

Promise.all(promises).then(function (values) {
    drawVis(values[0], values[1])
});

Helper.collapsibleTable();

function drawVis(stateBoundaries, data) {

    console.log(stateBoundaries);
    console.log(data)

    let start = d3.min(data, function(d) {return +d.i});
    let limit = d3.max(data, function(d) {return +d.i});
    let i = start;
    let play = true;

    let params = {
                dates: data, 
                limit: limit, 
                play: play, 
                i: i,
                speed: 1000
            }

    const width = window.innerWidth*.2;
    const height = 50;

    let filteredData = [data[0]];
    console.log(filteredData);

    let svg = d3.select("#containment")
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
            .attr("height", 20 )
            .attr("fill", "#EE2724");

    Helper.setDate(params, function (date) {
        Containment.update(svg, data, xScale, date)
    });

    Map.build("#chart", stateBoundaries, data);
}