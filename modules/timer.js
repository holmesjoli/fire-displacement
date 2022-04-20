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

    var git = setInterval(function () {

        if (params.i < params.limit + 1) {

            let filteredDates = params.dates.filter(function(d) {
                return d.i === params.i;
            });

            callback(`${filteredDates[0].date}`);

        } else {
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
        .attr("width", xScale.bandwidth())
        .attr("height", params.barHeight)
        .attr("fill", "#473F41");

    let b = svg.selectAll(".timeline")
            .data(data, function(d) { return d.date; });

    b.transition()
        .attr("x", function(d) {return xScale(d.date)})
        .attr("y", 0)
        .attr("class", "timeline")
        .attr("width", xScale.bandwidth())
        .attr("height", params.barHeight)
        .attr("fill", "#473F41");
}
