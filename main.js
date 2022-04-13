import * as Helper from './modules/helper_functions.js';
import * as Map from './modules/map.js';
import * as Containment from "./modules/containment.js";
import * as Story from "./modules/storyline.js";

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
        pth: "./data/ok_bigstreets.geojson",
        parse: null
    },

    countyMedStreets: {
        pth: "./data/ok_medstreets.geojson",
        parse: null
    },

    countySmallStreets: {
        pth: "./data/ok_smallstreets.geojson",
        parse: null
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
    },

    cities: {
        pth: "./data/ok_places.csv",
        parse: function(j) {
            return {
                name: j.name,
                population: +j.population,
                lat: +j.lat,
                long: +j.long
            }
        }
    },

    shelters: {
        pth: "./data/shelters.csv",
        parse: function(j) {
            return {
                name: j.name,
                lat: +j.lat,
                long: +j.long
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
    drawVis(values[0], values[1], values[2], values[3], values[4], values[5],values[6], values[7])
});

Helper.collapsibleTable();

const cc = new Containment.ContainmentClass("#containment");
const mc = new Map.MapClass("#chart");
const sc = new Story.StoryClass("story");

console.log(sc);

function drawVis(stateBoundaries, countyBoundaries, okBigStreets, okMedStreets, okSmallStreets, data, cities, shelters) {

    console.log(stateBoundaries);
    console.log(countyBoundaries);
    console.log(okBigStreets)
    console.log(okMedStreets)
    console.log(okSmallStreets)
    console.log(data)
    console.log(cities)
    console.log(shelters)

    let cntyCodes = ["53047", "53007", "53017"]

    let start = d3.min(data, function(d) {return +d.i});
    let limit = d3.max(data, function(d) {return +d.i});
    let i = start;
    let play = true;

    let params = {
                dates: data, 
                limit: limit, 
                play: play, 
                i: i,
                speed: 500
            }

    // Set initial parameters before they enter loop
    cc.draw(data, "714");
    mc.draw(stateBoundaries, countyBoundaries, okBigStreets, shelters, cities);
    sc.update("714"); // set initial storyline

    Helper.setDate(params, function (date) {
        // console.log(date)
        // cc.update(data, date);
        // mc.update(data, date);
        sc.update(date);
        sc.effects(data, date);
    });
}
