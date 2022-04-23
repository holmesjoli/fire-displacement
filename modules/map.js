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

export function drawBasemap(g, data, geoPathGenerator, className, stroke = "#FFFFFF", strokeWidth = 1, fill = "#E0E0E0", fillOpacity = 1) {
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
    .attr("fill-opacity", fillOpacity)
}

export function drawPath(g, data, geoPathGenerator, stroke = "#D7D7D7", strokeWidth = 1, opacity = .5) {
    let path = g
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

    return path;
}

export function createHouses(g, projection, data, className, fill = "green", r = 2, fillOpacity = 1) {

    let housePoints = g
    .append("g")

    housePoints
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

    return housePoints;
}

export function updateHouses(g, housePoints, geoPathGenerator, data) {

    let path = drawPath(g, data.features, geoPathGenerator, "yellow", 1.5);

    // let c = houses.selectAll("circle")
    //     .data(data, function(d) {return d.id;});

    //     c
    //     .enter()
    //     .append("circle")
    //     .merge(c)
    //         .transition()
    //         .duration(3000)
    //         .attr("cx", function(d) {return projection([d.shelterLong, d.shelterLat])[0];})
    //         .attr("cy", function(d) {return projection([d.shelterLong, d.shelterLat])[1];})
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

export function updateFire(fire, projection, data, r, opacity, date) {

    //https://gka.github.io/palettes/#/8|s|ffcc55,f68c1f,ea2c24|ffffe0,ff005e,93003a|1|1
    const colorScale = d3.scaleOrdinal()
        .domain([1, 9])
        .range(['#ffcc55', '#fdb947', '#fba63b', '#f99332', '#f57e2b', '#f26826', '#ee4f24', '#ea2c24']);

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
            .attr("fill", function(d) {
                
                if (d.endDate <= date) {
                    return "#473F41";
                } else {
                    return colorScale(d.nDays)
                }
            })
            .attr("r", r)
            .attr("opacity", opacity);
}
