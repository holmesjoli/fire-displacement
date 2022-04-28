// Draw Basemap
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

// Draw path
export function drawPath(g, projection, data, className, stroke = "#D7D7D7", strokeWidth = 1, strokeOpacity = .5, fill ="none", fillOpacity) {

    let geoPathGenerator = d3.geoPath().projection(projection);

    let path = g
        .append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("class", className)
        .attr("d", geoPathGenerator)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
        .attr("fill-opacity", fillOpacity)
        .attr("fill", fill);

    return path;
}

// Create households
export function createHouses(g, projection, data, className, paramsMap) {

    // console.log(data)
    let points = g
    .append("g")

    points
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("class", className)
        .attr("cx", function(d) {return projection([d.properties.x, d.properties.y])[0];})
        .attr("cy", function(d) {return projection([d.properties.x, d.properties.y])[1];})
        .attr("r", 1)
        .attr("fill", "#36479D")
        .attr("fill-opacity", .5)
        .attr("stroke", "#36479D")
        .attr("stroke-opacity", 1);

    // let tw = g.node().clientWidth;
    // let th = g.node().clientHeight;
    // let sx = tw / paramsMap.width;
    // let sy = th / paramsMap.height;

    // let tooltip = d3.select(`#tooltip`)
    //     .append("div")
    //     .attr("class", "tooltip");
    
    // points.on("mouseover", function(e, d) {

    //     console.log(d)
    //     let x = sx*(+d3.select(this).attr("cx")) + 20;
    //     let y = sy*(+d3.select(this).attr("cy")) - 10;

    //     tooltip.style("visibility", "visible")
    //         .style("top", `${y}px`)
    //         .style("left", `${x}px`)
    //         // .html(`${d.properties.place}`);

    // }).on("mouseout", function() {
    //     tooltip.style("visibility", "hidden");
    // });

    return points;
}

// https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
function getNonZeroRandomNumber(min, max) {
    var random = Math.floor(Math.random()*min) - max;
    if(random==0) return getNonZeroRandomNumber();
    return random;
}

// Updates the households
//Adapted from http://bl.ocks.org/JMStewart/6455921
export function updateHouses(g, projection, data, speed) {

    let c = g.selectAll("circle")
    .data(data, function(d) {return d.properties.id;});

    c
    .enter()
    .append("circle")
    .merge(c)
        .transition()
        .delay(function(d, i) {return 10*getNonZeroRandomNumber(399, 299)})
        .duration(speed)
        .tween("pathTween", function(d, i) {
            return pathTween(drawPath(g, projection, [d], "yellow", 0))
        });

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

// Create initial shelter points
// Shelter points are initially not visible
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
            .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
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
            .attr("stroke", "#FFFFFF")
            .attr("stroke-weight", 2)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);

    return points;
}

// Update shelter points
export function updateShelter(g, projection, data, fill, r, opacity) {

    let c = g.selectAll("circle")
        .data(data, function(d) {return d.id;});

        c
        .enter()
        .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("stroke", "#FFFFFF")
            .attr("fill", "#FFFFFF")
            .attr("r", r)
            .attr("stroke-opacity", opacity)
            .attr("fill-opacity", .2)
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
        .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
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


// Create initial fire points
export function createFire(g, data) {

    let points = g
            .append("g")

    points
        .selectAll("circle")
        .data(data)
        // .enter()
        // .append("circle")

    return points;
}

function fireBurnNDays(date, d) {

    let month = "0"+ date.toString().substr(0, 1);
    let day = date.toString().substr(1, 3);
    let newDate = new Date(`2014-${month}-${day}`)
    var diff = new Date(newDate.getTime() - d.startDay.getTime());

    return diff.getUTCDate() - 1;
}

// Update fire points
export function updateFire(g, projection, data, date, colorScale, rScale) {

    let c = g.selectAll("circle")
        .data(data, function(d) {return d.id;});

        c
        .enter()
        .append("circle")
            .attr("cx", function(d) {return projection([d.long, d.lat])[0];})
            .attr("cy", function(d) {return projection([d.long, d.lat])[1];})
            .attr("r", function(d) {
                if (date >= d.endDate) {
                    return .5;
                } else {
                    return rScale(fireBurnNDays(date, d));
                }
            })
            .attr("fill", function(d) { 
                if (date >= d.endDate) {
                    return "#473F41";
                } else {
                    return colorScale(fireBurnNDays(date, d));
                }
            })
            .attr("stroke", function(d) {
                if (date >= d.endDate) {
                    return "#473F41";
                } else {
                    return colorScale(fireBurnNDays(date, d));
                }
            })
            .attr("fill-opacity", function(d) {
                if (date >= d.endDate) {
                    return .3;
                } else {
                    return 1;
                }
            })
            .attr("stroke-opacity", 1)
            .attr("stroke-width", .5)
        .merge(c)
            .transition()
            .duration(500)
            .ease(d3.easeCircleIn)

    c.exit()
    .transition()
    .duration(3000)
    .ease(d3.easeCircleOut)
    .attr("r", .5)
    .remove();
}

// Create Legend
export function createLegend(svg, rScale, colorScale, maxDays) {

    svg.append("text")
        .attr("x", 10)
        .attr("y", 10)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("# of days burning")

    for (var j = 1; j < maxDays; j= j + 5) {
        svg.append("circle")
            .attr("cx", 15)
            .attr("cy", 20 + j*4)
            .attr("r", rScale(j))
            .attr("fill", colorScale(j));

            svg.append("text")
            .attr("x", 30)
            .attr("y", 20 + j*4 + 4)
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("color", "#473F41")
            .text(j)
    }

    svg.append("text")
        .attr("x", 100)
        .attr("y", 10)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("contained fire")

    svg.append("circle")
        .attr("cx", 105)
        .attr("cy", 20)
        .attr("r", rScale(2))
        .attr("fill", "#473F41")
        .attr("stroke", "#473F41")
        .attr("stroke-width", .5)
        .attr("fill-opacity", .3);

    svg.append("text")
        .attr("x", 100)
        .attr("y", 40)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("shelter")

    svg.append("circle")
        .attr("cx", 110)
        .attr("cy", 55)
        .attr("r", 8)
        .attr("fill", "#D7D7D7")
        .attr("stroke", "#D7D7D7")
        .attr("stroke-width", 2)
        .attr("fill-opacity", .2);

    svg.append("path")
        .attr("transform", d => "translate(" + [110, 55] + ")")
        .attr("d", d3.symbol().type(d3.symbolCross).size("50"))
        .attr("fill", "#EE2C25");

    svg.append("text")
        .attr("x", 100)
        .attr("y", 80)
        .attr("font-size", 8)
        .attr("color", "#473F41")
        .text("household");

    svg.append("circle")
        .attr("cx", 105)
        .attr("cy", 88)
        .attr("r", 2)
        .attr("fill", "#36479D")
        .attr("fill-opacity", .6)
        .attr("stroke", "#36479D")
        .attr("stroke-opacity", 1);

}
