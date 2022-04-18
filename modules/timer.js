// Create days label
// Description an array for each date 
// Return array
export function daysLabel(days, dates) {
    let days2 = []
    days.forEach(function(d) {

        let x = dates.filter(function(j) {
            return j.date === d;
        });
        days2.push(x[0].day)
    })

    return days2;
}

// Title Set Date
// param params
// param callback
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

            callback(`${filteredDates[0].date}`);
            
        } else {
            clearInterval(monthId);
            clearInterval(dayId);
            clearInterval(git);
        }

        params.i++;
    }, params.speed);
}

export function draw(svg, params, xScale, data) {

    let bar = svg.selectAll("rect")
        .data(data)
        .enter()
        .attr("x", function(d) {return xScale(d.date)})
        .attr("y", 0)
        .attr("class", "timeline")
        .attr("width", params.barWidth)
        .attr("height", params.barHeight)
        .attr("fill", "#E05926");

    let b = svg.selectAll(".burn")
            .data(data, function(d) { return d.date; });

    b.transition()
        .duration(params.speed)
        .attr("x", function(d) {return xScale(d.date)})
        .attr("y", 0)
        .attr("class", "timeline")
        .attr("width",  params.barWidth)
        .attr("height",  params.barHeight)
        .attr("fill", "#E05926");
}
