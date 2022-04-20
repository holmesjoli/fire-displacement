export function createCities(g, data, tooltip, projection, className, fill, r, fillOpacity = 1, svg, width, height) {
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

    let tw = svg.node().clientWidth;
    let th = svg.node().clientHeight;
    let sx = tw / width;
    let sy = th / height;

    points.on("mouseover", function(e, d) {

        let x = sx*(+d3.select(this).attr("cx")) + 20;
        let y = sy*(+d3.select(this).attr("cy")) - 10;

        tooltip.style("visibility", "visible")
            .style("top", `${y}px`)
            .style("left", `${x}px`)
            .html(`${d.name}`);

    }).on("mouseout", function() {
        tooltip.style("visibility", "hidden");
    });
}

export function drawBasemap(g, data, geoPathGenerator, className, stroke = "#FFFFFF", strokeWidth = 1, fill = "#E0E0E0") {
    g
    .append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", className)
    .attr("d", geoPathGenerator)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fill)
}

export function drawPath(g, data, geoPathGenerator, stroke = "#D7D7D7", strokeWidth = 1, opacity = .5) {
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

export function createHouses(g, data, projection, className, fill, r, fillOpacity = 1) {
    // let houses = g
    //     .append("g")
    //     .selectAll("path")
    //     .data(data)
    //     .enter()
    //     .append("path")
    //         .attr("class", className)
    //         .attr("transform", d => "translate(" + [
    //             projection([d.long, d.lat])[0],
    //             projection([d.long, d.lat])[1]] + ")")
    //         .attr("d", d3.symbol().type(d3.symbolSquare).size(r))
    //         .attr("fill", fill)
    //         .attr("fill-opacity", fillOpacity);

    let houses = g
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

    return houses
}

export function updateHouses(houses, projection, data) {


    console.log(data)
    let c = houses.selectAll("circle")
        .data(data, function(d) {return d.id;});

        c
        .enter()
        .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("fill", "#000000")
            .attr("r", 1)
            .attr("opacity", .5)
        .merge(c)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {return projection([d.shelterLong, d.shelterLat])[0];})
            .attr("cy", function(d) {return projection([d.shelterLong, d.shelterLat])[1];})

    c.exit()
        .transition()
        .attr("r", 0)
        .attr("opacity", 0)
        .duration(1000)
        .remove();
}

export function createShelter(g, projection, data) {

    let shelters = g
        .append("g")

    shelters
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
            .attr("class", "shelters")
            .attr("transform", d => "translate(" + [
            projection([d.long, d.lat])[0],
            projection([d.long, d.lat])[1]] + ")")
            .attr("d", d3.symbol().type(d3.symbolCross).size("200"))
            .attr("fill", "#FFFFFF")
            .attr("fill-opacity", 0)

    shelters
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", "shelters")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 8)
            .attr("fill", "#FFFFFF")
            .attr("fill-opacity", 0);

    return shelters;
}

export function updateShelter(shelter, projection, data, fill, r, opacity) {

    let c = shelter.selectAll("circle")
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

    c.exit()
        .transition()
        .attr("r", 0)
        .attr("opacity", 0)
        .duration(1000)
        .remove();

    let s = shelter.selectAll("path")
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
        .attr("opacity", 0)
        .duration(1000)
        .remove();
}

export function createFire(g, projection, data) {
    let fire = g
            .append("g")

    fire
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("class", "shelters")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 1)
            .attr("fill", "#FFFFFF")
            .attr("fill-opacity", 0)

    return fire
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function updateFire(fire, projection, data, r, opacity) {

    const colors = ["#E82B25", "#F6891F", "#F9C94A", "#F15523", "#B62025", "#FAA51A", "#F5841F", "#FCCC4D"]

    let c = fire.selectAll("circle")
        .data(data, function(d) {return d.id;});

        c
        .enter()
        .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", 0)
            .attr("opacity", 0)
        .merge(c)
            .transition()
            .duration(3000)
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("fill", function(d) {return colors[getRandomInt(colors.length - 1)]})
            .attr("r", r)
            .attr("opacity", opacity);
}
