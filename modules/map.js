function mouseoverPoints(points, tooltip) {

    points.on("mouseover", function(e, d) {

        let x = +d3.select(this).attr("cx") + 20;
        let y = +d3.select(this).attr("cy") - 10;

        tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`${d.name}`);

    }).on("mouseout", function() {
        tooltip.style("visibility", "hidden");
    });
}

function createPoints(g, data, tooltip, projection, className, fill, r, fillOpacity = 1) {
    let points = g
        .append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", className)
        .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
        .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
        .attr("r", r)
        .attr("fill", fill)
        .attr("fill-opacity", fillOpacity);

    mouseoverPoints(points, tooltip);
}

function drawBasemap(g, data, geoPathGenerator, stroke = "#FFFFFF", strokeWidth = 1) {
    g
    .append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", 'state')
    .attr("d", geoPathGenerator)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("fill", "#D7D7D7")
    .attr("opacity", .5);
}

function drawRoad(g, data, geoPathGenerator, stroke = "#FFFFFF", strokeWidth = 1, opacity = .5) {
    g
    .append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", 'state')
    .attr("d", geoPathGenerator)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("fill", "none")
    .attr("opacity", opacity);
}

export function draw(svg, g, tooltip, projection, geoPathGenerator, stateBoundaries, countyBoundaries, okBigStreets, okMedStreets, okSmallStreets, countyHouses, cities, shelters) {

    drawBasemap(g, stateBoundaries.features, geoPathGenerator);
    drawBasemap(g, countyBoundaries.features, geoPathGenerator);
    drawRoad(g, okBigStreets.features, geoPathGenerator, "#000000", 3);
    drawRoad(g, okMedStreets.features, geoPathGenerator, "#000000", 2);
    // drawBasemap(g, okSmallStreets.features, geoPathGenerator, "#000000", .5);
    createPoints(g, countyHouses, tooltip, projection, "houses", "#6CBE45", 2, .2);
    createPoints(g, cities, tooltip, projection, "cities", "#00AEEF", 5);
    // createPoints(g, shelters, tooltip, projection, "shelters", "#EE2724", 40, .3);

    // create a zoom function
    var zoom = d3.zoom()
    .scaleExtent([0, 15])
    .on("zoom", function(event) {
        g
        .attr("transform", `scale(${event.transform.k}) translate(${event.transform.x}, ${event.transform.y})`);
    })

    // call zoom so it is "listening" for an event on our SVG
    svg.call(zoom);
}

export function openShelter(g, tooltip, projection, shelters, date) {
    let shelterData = shelters.filter(function(d) {
        return d.openDate === date;
    });

    createPoints(g, shelterData, tooltip, projection, "shelters", "#EE2724", 40, .3);
}

export function closeShelter(g, tooltip, projection, shelters, date) {

    let shelterData = shelters.filter(function(d) {
        return d.closeDate === date;
    });

    let c = g.selectAll(".shelter")
            .data(shelterData, function(d) {return d.id;});

        c
        .enter()
        // .append("circle")
        //     .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
        //     .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
        //     .attr("r", 10)
        //     .attr("fill", "#EE2724")
        //     .attr("fill-opacity", .3)
        .merge(c)
            .transition()
            .duration(1000)
            .delay(1000)
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 40)
            .attr("fill", "#EE2724")
            .attr("fill-opacity", .3);

        c.exit()
            .transition()
            .duration(1000)
            .delay(1000)
            .attr("r", 0)
            .attr("fill-opacity", 0)
            .remove();
}