export function createCities(g, projection, data, className, tooltip, fill, r, fillOpacity = 1, svg, width, height) {
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

export function drawBasemap(g, projection, data, className, stroke = "#FFFFFF", strokeWidth = 1, fill = "#E0E0E0", fillOpacity = 1) {
    
    let geoPathGenerator = d3.geoPath().projection(projection);
    
    let path = g
    .append("g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("class", className)
    .attr("d", geoPathGenerator)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("fill", fill)
    .attr("fill-opacity", fillOpacity);

    return path;
}

export function drawPath(g, projection, data, stroke = "#D7D7D7", strokeWidth = 1, strokeOpacity = .5, fill ="none", fillOpacity) {

    let geoPathGenerator = d3.geoPath().projection(projection);

    let path = g
        .append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", 'state')
        .attr("d", geoPathGenerator)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
        .attr("fill-opacity", fillOpacity)
        .attr("fill", fill);

    return path;
}

export function createHouses(g, projection, data, className, fill = "green", r = 2, fillOpacity = 1) {

    let points = g
    .append("g")

    points
    .selectAll("circle")
    .data(data.features)
    .enter()
    .append("circle")
        .attr("class", className)
        .attr("cx", function(d) {return projection([d.properties.x, d.properties.y])[0];})
        .attr("cy", function(d) {return projection([d.properties.x, d.properties.y])[1];})
        .attr("r", r)
        .attr("fill", fill)
        .attr("fill-opacity", fillOpacity);

    return points;
}

export function updateHouses(g, projection, data) {

    let path = drawPath(g, projection, data, "yellow", 1);

    let points = g
    .append("g")

    points
    .selectAll("circle")
    .data(data.features)
    .enter()
    .append("circle")
        .attr("class", "household")
        .attr("cx", function(d) {return projection([d.properties.x, d.properties.y])[0];})
        .attr("cy", function(d) {return projection([d.properties.x, d.properties.y])[1];})
        .attr("r", 2)
        .attr("fill", "green")
        .attr("fill-opacity", 1)
        .transition()
			.delay(250)
			.duration(3000)
			.tween("pathTween", function(){return pathTween(path)});

    function pathTween(path) {
            var length = path.node().getTotalLength(); // Get the length of the path
            var r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length
            return function(t){
                var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
                d3.select(this) // Select the circle
                    .attr("cx", point.x) // Set the cx
                    .attr("cy", point.y) // Set the cy
            }
    }
}

export function createShelter(g, projection, data) {

    let points = g
        .append("g")

    points
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

    points
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

    return points;
}

export function updateShelter(g, projection, data, fill, r, opacity) {

    let c = g.selectAll("circle")
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

    let s = g.selectAll("path")
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
    let points = g
            .append("g")

    points
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

    return points;
}

export function updateFire(g, projection, data, r, opacity, date) {

    //https://gka.github.io/palettes/#/8|s|ffcc55,f68c1f,ea2c24|ffffe0,ff005e,93003a|1|1
    const colorScale = d3.scaleOrdinal()
        .domain([1, 9])
        .range(['#ffcc55', '#fdb947', '#fba63b', '#f99332', '#f57e2b', '#f26826', '#ee4f24', '#ea2c24']);

    let c = g.selectAll("circle")
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
