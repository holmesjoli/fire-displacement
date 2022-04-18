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
                containment_previous: + j.containment_previous,
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
                size: +j.size2,
                total_personnel: +j.total_personnel,
                scale: +j.scale,
                centerX: +j.centerX,
                centerY: +j.centerY
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
    }
};

let promises = [];

for (var key of Object.keys(files)) {
    var fl = files[key];
    Helper.read(fl.pth, fl.parse, promises);
}

Promise.all(promises).then(function (values) {
    drawVis(values[0], values[1], values[2], values[3], values[4], values[5],values[6], values[7], values[8], values[9])
});

const burnParams = {
    selector: "#burn",
    margin: 5,
    width: 400
}

const margin = 10;
const svgBurn = d3.select(burnParams.selector)
    .append("svg")
    .attr("viewBox", `0 0 ${burnParams.width} ${burnParams.width}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

// Helper.collapsibleTable();

// const width = window.innerWidth*.65;
// const height = window.innerHeight;
// const margin = {top: 0, right: 10, bottom: 20, left: 10};
// const initialScale = 30000;
// const initialCenterX = -23.5;
// const initialCenterY = 48.25;

// let tooltip = d3.select("#chart")
//             .append("div")
//             .attr("class", "tooltip");

// let projection = d3.geoAlbers()
//     .translate([width / 2, height / 2])
//     .scale(initialScale)
//     .center([initialCenterX, initialCenterY]);

// let geoPathGenerator = d3.geoPath().projection(projection);

// const svg = d3.select("#chart")
//     .append("svg")
//     .attr("viewBox", `0 0 ${width} ${height}`)
//     .attr("preserveAspectRatio", "xMidYMid meet")
//     .attr("id", "map-svg")
//     .classed("svg-content", true);

// let g = svg.append("g");

// const cc = new Containment.ContainmentClass("#containment");
// const sc = new Story.StoryClass("story");

function drawVis(stateBoundaries, countyBoundaries, okBigStreets, okMedStreets, okSmallStreets, countyHouses, data, cities, shelters, fires) {

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

    // // let cntyCodes = ["53047", "53007", "53017"]

    let start = d3.min(data, function(d) {return +d.i});
    let limit = d3.max(data, function(d) {return +d.i});
    let i = start;
    let startDay = d3.min(data, function(d) {return +d.date});
    let endDay = d3.max(data, function(d) {return +d.date});
    let dataInitial = data.filter(function(d) {
        return d.date === startDay;
    });

    let params = {
        dates: data, 
        limit: limit,
        i: i,
        speed: 1500
    }

    // Burn
    burnParams["min"] = d3.min(data, function(d) {return d.size;});
    burnParams["max"] = d3.max(data, function(d) {return +d.size});
    burnParams["speed"] = params.speed

    const xBurnScale = d3.scaleSqrt()
        .domain([burnParams.min, burnParams.max])
        .range([burnParams.margin, burnParams.width - burnParams.margin]);

    const yBurnScale = d3.scaleSqrt()
        .domain([burnParams.min, burnParams.max])
        .range([burnParams.width - burnParams.margin, burnParams.margin]);

    svgBurn
        .append("rect")
        .attr("x", burnParams.margin)
        .attr("y", burnParams.margin)
        .attr("width", xBurnScale(burnParams.min))
        .attr("height", yBurnScale(burnParams.max))
        .attr("fill", "#FFFFFF")
        // .attr("stroke", "#473F41");

    // // Set initial parameters before they enter loop
    // // cc.draw(data, startDay);
    // sc.update(startDay); // set initial storyline
    // Burn.setupSVG(sizeWidth, margin, sizeExtent, rScale)

    Timer.setDate(params, function (date) {
        // console.log(date)

        date = parseInt(date);
        let dataUpdate = data.filter(function(d) {
            return d.date === date;
        });

        console.log(dataUpdate)

        Burn.draw(svgBurn, burnParams, dataUpdate, xBurnScale, yBurnScale)

        // Burn.draw(svgBurn, margin, rScale, dataInitial, dataUpdate);
        // Map.openShelter(g, tooltip, projection, shelters, date);
        // Map.closeShelter(g, tooltip, projection, shelters, date)
        // sc.update(date);
        // sc.effects(data, date);
    });

    // Map.draw(svg, g, tooltip, projection, geoPathGenerator, stateBoundaries, countyBoundaries, okBigStreets, okMedStreets, okSmallStreets, countyHouses, cities, shelters);
}
