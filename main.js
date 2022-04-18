import * as Helper from './modules/helper_functions.js';
import * as Timer from './modules/timer.js'
import * as Map from './modules/map.js';
import * as Containment from "./modules/containment.js";
import * as Story from "./modules/storyline.js";
import * as Burn from "./modules/burn.js"

const files = {
    stateBoundaries: {
        pth: "./data/state_boundaries.geojson",
        parse: null
    },

    countyBoundaries: {
        pth: "./data/counties_geo.geojson",
        parse: null
    },

    countyBigStreets: {
        pth: "./data/county_bigstreets_reg.geojson",
        parse: null
    },

    countyMedStreets: {
        pth: "./data/county_medstreets_reg.geojson",
        parse: null
    },

    countySmallStreets: {
        pth: "./data/county_smallstreets_simp.geojson",
        parse: null
    },

    countyHouses: {
        pth: "./data/county_houses.csv",
        parse: function(j) {
            return {
                long: +j.X,
                lat: +j.Y,
                name: "household"
            }
        }
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
                date: +j.date,
                n_homes: +j.n_homes,
                n_structures: +j.n_structures,
                overhead_personnel: +j.overhead_personnel,
                size: +j.size,
                total_personnel: +j.total_personnel,
                scale: +j.scale,
                centerX: +j.centerX,
                centerY: +j.centerY,
                story: j.story
            }
        }
    },

    cities: {
        pth: "./data/ok_places.csv",
        parse: function(j) {
            if (j.keep === "TRUE") {
                return {
                    name: "<b>Municipality: </b>" + j.name,
                    population: +j.population,
                    lat: +j.lat,
                    long: +j.long
                }
            }
        }
    },

    shelters: {
        pth: "./data/shelters.csv",
        parse: function(j) {
            return {
                id: j.id,
                name: "<b>Shelter: </b>" + j.name,
                openDate: +j.openDate,
                closeDate: +j.closeDate,
                lat: +j.lat,
                long: +j.long
            }
        }
    },
    fires: {
        pth: "./data/fire_points.csv",
        parse: function(j) {
            return {
                date: +j.date,
                lat: +j.Lat,
                long: +j.Lon
            }
        }
    },
    firesBoundary: {
        pth: "./data/fire_boundary.geojson",
        parse: null
    }
};

let promises = [];

for (var key of Object.keys(files)) {
    var fl = files[key];
    Helper.read(fl.pth, fl.parse, promises);
}

Promise.all(promises).then(function (values) {
    drawVis(values[0], values[1], values[2], values[3], values[4], values[5],values[6], values[7], values[8], values[9], values[10])
});

// Timeline
const paramsTimeline = {
    selector: "timeline",
    margin: {top: 0, right: 10, bottom: 50, left: 10},
    width: 1000,
    height: 100,
    barHeight: 50,
    barWidth: 10
}

const svgTimeline = d3.select(`#${paramsTimeline.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsTimeline.width} ${paramsTimeline.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

// Burn
const paramsBurn = {
    selector: "burn",
    margin: 0,
    width: 400
}

const svgBurn = d3.select(`#${paramsBurn.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsBurn.width} ${paramsBurn.width}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

// Containment
const paramsContainment = {
    selector: "containment",
    margin: {top: 0, right: 10, bottom: 20, left: 10},
    width: 400,
    height: 100,
    barHeight: 50,
    min: 0,
    max: 100
}

const svgContainment = d3.select(`#${paramsContainment.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsContainment.width} ${paramsContainment.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

// Story
const paramsStory = {
    selector: "story"
}

//Map
const paramsMap = {
    selector: "chart",
    width: 500,
    height: 300,
    margin: {top: 0, right: 10, bottom: 50, left: 10},
    initialScale: 12000,
    initialCenterX: -23.5,
    initialCenterY: 48.25
}

const svgMap = d3.select(`#${paramsMap.selector}`)
    .append("svg")
    .attr("viewBox", `0 0 ${paramsMap.width} ${paramsMap.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");
    // .attr("id", "map-svg")
    // .classed("svg-content", true);

let g = svgMap.append("g");

let tooltip = d3.select(`#${paramsMap.selector}`)
            .append("div")
            .attr("class", "tooltip");

let projection = d3.geoAlbers()
    .translate([paramsMap.width / 2, paramsMap.height / 2])
    .scale(paramsMap.initialScale)
    .center([paramsMap.initialCenterX, paramsMap.initialCenterY]);

let geoPathGenerator = d3.geoPath().projection(projection);


// Helper.collapsibleTable();
// let cntyCodes = ["53047", "53007", "53017"]

function drawVis(stateBoundaries, countyBoundaries, okBigStreets, okMedStreets, okSmallStreets, countyHouses, data, cities, shelters, fires, fireBoundary) {

    console.log(stateBoundaries);
    console.log(countyBoundaries);
    console.log(okBigStreets)
    console.log(okMedStreets)
    console.log(okSmallStreets)
    console.log(countyHouses)
    console.log(data)
    console.log(cities)
    console.log(shelters)
    console.log(fires)
    console.log(fireBoundary)

    let start = d3.min(data, function(d) {return +d.i});
    let limit = d3.max(data, function(d) {return +d.i});
    let i = start;

    let params = {
        dates: data, 
        limit: limit,
        i: i,
        speed: 3000
    }

    // Timeline
    paramsTimeline["min"] = d3.min(data, function(d) {return d.date;});
    paramsTimeline["max"] = d3.max(data, function(d) {return d.date});
    paramsTimeline["speed"] = params.speed

    let days = Helper.uniqueArray(data, "date").sort(function(a, b) {return a - b});
    let days2 = Timer.daysLabel(days, data);
    let xWidth = (paramsTimeline.width - paramsTimeline.margin.left - paramsTimeline.margin.right)/days.length;

    const july = svgTimeline.append("text")
        .attr("class","axis--label")
        .attr("x", paramsTimeline.margin.left + xWidth*17/2)
        .attr("y", paramsTimeline.height-paramsTimeline.margin.bottom/4)
        .text("July");

    const august = svgTimeline.append("text")
        .attr("class","axis--label")
        .attr("x", paramsTimeline.margin.left + xWidth*17 + xWidth*27/2)
        .attr("y", paramsTimeline.height-paramsTimeline.margin.bottom/4)
        .text("August");

    let xScaleTimeline = d3.scaleBand()
        .domain(days)
        .range([paramsTimeline.margin.left, paramsTimeline.width - paramsTimeline.margin.right]);

    let xAxisTimeline = svgTimeline
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${paramsTimeline.height-paramsTimeline.margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleTimeline).tickValues(days).tickFormat((d, i) => days2[i]));

    // Burn
    paramsBurn["min"] = d3.min(data, function(d) {return d.size;});
    paramsBurn["max"] = d3.max(data, function(d) {return d.size});
    paramsBurn["speed"] = params.speed

    const xScaleBurn = d3.scaleSqrt()
        .domain([paramsBurn.min, paramsBurn.max])
        .range([paramsBurn.margin, paramsBurn.width - paramsBurn.margin]);

    const yScaleBurn = d3.scaleSqrt()
        .domain([paramsBurn.min, paramsBurn.max])
        .range([paramsBurn.width - paramsBurn.margin, paramsBurn.margin]);

    svgBurn
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "burn")
        .attr("width", xScaleBurn(paramsBurn.min))
        .attr("height", yScaleBurn(paramsBurn.max))
        .attr("fill", "#FFFFFF")

    // Containment
    paramsContainment["speed"] = params.speed

    let xScaleContainment = d3.scaleLinear()
        .domain([paramsContainment.min, paramsContainment.max])
        .range([paramsContainment.margin.left, paramsContainment.width - paramsContainment.margin.right]);

    svgContainment
        .append("rect")
        .attr("x", paramsContainment.margin.left)
        .attr("y", 0)
        .attr("class", "containment")
        .attr("width", xScaleContainment(paramsContainment.min))
        .attr("height", paramsContainment.barHeight)
        .attr("fill", "#FFFFFF")

    let xAxisContainment = svgContainment
        .append("g")
        .attr("class","axis")
        .attr("transform",`translate(0, ${paramsContainment.height-paramsContainment.margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleContainment).ticks(2));

    //Map
    Map.drawBasemap(g, stateBoundaries.features, geoPathGenerator);
    Map.drawBasemap(g, countyBoundaries.features, geoPathGenerator);
    Map.drawPath(g, okBigStreets.features, geoPathGenerator, "#000000", 1.5);
    Map.drawPath(g, okMedStreets.features, geoPathGenerator, "#000000", 1);
    Map.createHouses(g, countyHouses, tooltip, projection, "houses", "#382767", 1, .2);
    Map.createPoints(g, cities, tooltip, projection, "cities", "#8B4B6A", 15, .2);

    let shelterArea = g
        .append("g")

    shelterArea
        .selectAll("path")
        .data(shelters)
        .enter()
        .append("path")
            .attr("class", "shelters")
            .attr("transform", d => "translate(" + [
            projection([d.long, d.lat])[0],
            projection([d.long, d.lat])[1]] + ")")
            .attr("d", d3.symbol().type(d3.symbolCross).size("200"))
            .attr("fill", "#FFFFFF")
            .attr("fill-opacity", 0)

    shelterArea
        .selectAll("circle")
        .data(shelters)
        .enter()
        .append("circle")
            .attr("class", "shelters")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 8)
            .attr("fill", "#FFFFFF")
            .attr("fill-opacity", 0)

    let firePoints = g
            .append("g")

    firePoints
        .selectAll("circle")
        .data(fires)
        .enter()
        .append("circle")
            .attr("class", "shelters")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 1)
            .attr("fill", "#FFFFFF")
            .attr("fill-opacity", 0)


    // Timer
    Timer.setDate(params, function (date) {

        date = parseInt(date);
        let dataUpdate = data.filter((d) => d.date === date);
        let firesUpdate = fires.filter((d) => d.date === date);
        let sheltersUpdate = shelters.filter((d) => date >= d.openDate && date <= d.closeDate);

        Burn.draw(svgBurn, paramsBurn, xScaleBurn, yScaleBurn, dataUpdate);
        Containment.draw(svgContainment, paramsContainment, xScaleContainment, dataUpdate);
        Story.update(paramsStory.selector, dataUpdate);
        Story.effects(dataUpdate);
        // Timer.draw(svgTimeline, paramsTimeline, xScaleTimeline, data)

        // Update the projection
        // let k = dataUpdate[0].scale;
        // projection.scale(k);

        // geoPathGenerator = d3.geoPath().projection(projection);
        // svgMap.selectAll("path").attr("d", geoPathGenerator);

        Map.updateShelter(shelterArea, projection, sheltersUpdate, "#EE2C25", 8, 1)
        Map.updateFire(firePoints, projection, firesUpdate, 1, .8)

        if (date === 825) {
            Map.drawPath(g, fireBoundary.features, geoPathGenerator, "#EE2C25", 1.5);
        }

    });

    var zoom = d3.zoom()
    .scaleExtent([0, 15])
    .on("zoom", function(event) {
        g
        .attr("transform", `scale(${event.transform.k}) translate(${event.transform.x}, ${event.transform.y})`);
    })

    svgMap.call(zoom);
}
