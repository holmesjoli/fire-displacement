export function mouseoverPoints(points, tooltip) {

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

export function createPoints(g, data, tooltip, projection, className, fill, r, fillOpacity = 1) {
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

export function drawBasemap(g, data, geoPathGenerator, stroke = "#FFFFFF", strokeWidth = 1) {
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
    // .attr("opacity", .5);
}

export function drawRoad(g, data, geoPathGenerator, stroke = "#FFFFFF", strokeWidth = 1, opacity = .5) {
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
    drawRoad(g, okBigStreets.features, geoPathGenerator, "#000000", 1.5);
    drawRoad(g, okMedStreets.features, geoPathGenerator, "#000000", 1);
    // drawBasemap(g, okSmallStreets.features, geoPathGenerator, "#000000", .5);
    createPoints(g, countyHouses, tooltip, projection, "houses", "#6CBE45", 1, .2);
    createPoints(g, cities, tooltip, projection, "cities", "#00AEEF", 2.5);
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

export function updateShelter(symbol, projection, data, fill, r, opacity) {

    let c = symbol.selectAll("circle")
        .data(data, function(d) {return d.id;});

        c
        .enter()
        .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("fill","#FFFFFF")
            .attr("r", r)
            .attr("opacity", opacity)
        .merge(c)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", r)
            .attr("opacity", opacity);

    c.exit()
        .transition()
        .duration(1000)
        .remove();

    let s = symbol.selectAll("path")
        .data(data, function(d) {return d.id;});

    s
    .enter()
    .append("path")
        .attr("transform", d => "translate(" + [
        projection([d.long, d.lat])[0],
        projection([d.long, d.lat])[1]] + ")")
        .attr("d", d3.symbol().type(d3.symbolCross).size("75"))
        .attr("fill", fill)
        .attr("opacity", opacity)
    .merge(s)
        .transition()
        .duration(1000)
        .attr("transform", d => "translate(" + [
            projection([d.long, d.lat])[0],
            projection([d.long, d.lat])[1]] + ")")
        .attr("d", d3.symbol().type(d3.symbolCross).size("75"))

    s.exit()
        .transition()
        .duration(1000)
        .remove();

}


export function updateFire(circle, projection, data, fill, r, opacity) {

    let c = circle.selectAll("circle")
        .data(data, function(d) {return d.id;});

        c
        .enter()
        .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("fill", fill)
            .attr("r", r)
            .attr("opacity", opacity)
}