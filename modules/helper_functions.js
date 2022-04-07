// Title Read path
// param pth str. The path or url to read the data from
// param parse func. A parsing function specific to that data
// param promises array. Empty array
export function read(pth, parse, promises) {
    let ext = pth.split(".").pop();

    if (ext === "csv") {
        promises.push(d3.csv(pth, parse));
    } else if (ext === "json" || ext === "geojson") {
        promises.push(d3.json(pth, parse));
    } else {
        console.error("unknown file extension");
    }
}


// https://www.w3schools.com/howto/howto_js_collapsible.asp
export function collapsibleTable() {

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }
}

// Title Set Date
// param params
// param callbaxk
export function setDate(params, callback) {

    let monthId = document.getElementById('month');
    let dayId = document.getElementById('days');

    var git = setInterval(function () {

        if (params.i < params.limit + 1) {

            let filteredDates = params.dates.filter(function(d) {
                return d.i === params.i;
            });

            dayId.innerHTML = `${filteredDates[0].day}`;
            monthId.innerHTML =  `${filteredDates[0].month_name}`;

            // console.log(filteredDates[0].date);
            callback(`${filteredDates[0].date}`);
            
        } else {
            clearInterval(monthId);
            clearInterval(dayId);
            clearInterval(git);
        }

        if (params.play) {
            params.i++;
        };
    }, params.speed);
}
