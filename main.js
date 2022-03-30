import * as Helper from './modules/helper_functions.js';
import * as Map from './modules/map.js';

const files = {
    stateBoundaries: {
        pth: "./data/state_boundaries.geojson",
        parse: function(j) {
            return {
                AD: j.AD,
                data: j.date,
                reconstructed: j.reconstructed,
                data_type_code: j.data_type_code,
                century: +j.century,
                temp_bin: j.temp_bin,
                date_as_date: j.date_as_date
            }
        },
    }
};

let promises = [];

for (var key of Object.keys(files)) {
    var fl = files[key];
    Helper.read(fl.pth, fl.parse, promises);
}

Promise.all(promises).then(function (values) {
    drawVis(values[0])
});

function drawVis(stateBoundaries) {

    console.log(stateBoundaries);

    Map.build("#chart", stateBoundaries);
    
}