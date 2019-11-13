$(document).ready(function () {
    // set the dimensions and margins of the graph
    var margin = {
            top: 20,
            right: 30,
            bottom: 60,
            left: 43
        },
        width = 572,
        height = 280;

    //    var width = 572
    //    var height = 280


    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("id", "dataviz")
        //        .attr("width", width + margin.left + margin.right)
        //        .attr("height", height + margin.top + margin.bottom)
        //        .append("g")
        //        .attr("transform",
        //            "translate(" + margin.left + "," + margin.top + ")")
        .classed("svg-container2", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-30 -30 612 310")
        // Class to make it responsive.
        .classed("svg-content-responsive2", true);

    var rectGrafiek = d3.select("svg#dataviz").append("svg")
        .classed("svg-container2", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-20 -10 612 310")
        // Class to make it responsive.
        .classed("svg-content-responsive2", true);

    var gegevensGrafiek = d3.select("svg#dataviz").append("svg")
        .classed("svg-container2", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-20 -10 612 310")
        // Class to make it responsive.
        .classed("svg-content-responsive2", true);

    var jaarGrafiek = d3.select("svg#dataviz").append("svg")
        .classed("svg-container2", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-20 -10 612 310")
        // Class to make it responsive.
        .classed("svg-content-responsive2", true);

    var gruttokleur = "#7A7A99";
    var kievitkleur = "#EFBB87";
    var scholeksterkleur = "#bbc5ef";
    var tureluurkleur = "#E75856";
        
    //Read the data
    d3.csv("data_vogels_grafiek.csv",

        //When reading the csv, I must format variables:
        function (d) {
            return {
                date: d3.timeParse("%Y-%m-%d")(d.date),
                grutto: d.grutto,
                kievit: d.kievit,
                scholekster: d.scholekster,
                tureluur: d.tureluur,
                year: d.year
            }
        },

        // Now I can use this dataset:
        function (data) {

            // Add X axis --> it is a date format
            var x = d3.scaleTime()
                .domain(d3.extent(data, function (d) {
                    return d.date;
                }))
                .range([5, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "xas")
                .call(d3.axisBottom(x));
            //                .call(d3.axisBottom(x).tickSize(-height*1.3).ticks(10));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 130])
                .range([height, 0]);
            svg.append("g")
                .attr("class", "yas")
                //                .call(d3.axisLeft(y))
                .call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(7))
                .select(".domain").remove();

            // Add grutto line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "grutto")
                .attr("stroke", gruttokleur)
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .curve(d3.curveCardinal)
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.grutto)
                    })
                )

            // Add kievit line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "kievit")
                .attr("stroke", kievitkleur)
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .curve(d3.curveCardinal)
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.kievit)
                    })
                )

            // Add scholekster line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "scholekster")
                .attr("stroke", scholeksterkleur)
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .curve(d3.curveCardinal)
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.scholekster)
                    })
                )

            // Add tureluur line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("class", "tureluur")
                .attr("stroke", tureluurkleur)
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .curve(d3.curveCardinal)
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.tureluur)
                    })
                )

            svg.append("text")
                .attr("x", -9)
                .attr("y", 12)
                .attr("text-anchor", "start")
                .style("font-size", "8px")
                .style("fill", "#939393")
                .text("%")

            svg.append("text")
                .attr("x", 563)
                .attr("y", 295)
                .attr("text-anchor", "start")
                .style("font-size", "8px")
                .style("fill", "#939393")
                .text("jaar")

            // Gegevens
            gegevensGrafiek.append("text")
                .attr("x", 590)
                .attr("y", 30)
                .attr("width", 60)
                .attr("height", 50)
                .attr("class", "gegevensGrafiek")
                .attr("text-anchor", "end")
                //                .style("fill", "#e2e2e2")
                .style("fill", "#2d2329")
                .style("opacity", 1)
                .style("font-size", "13px")
                .text("<hover over punten>");

            jaarGrafiek.append("text")
                .attr("x", 590)
                .attr("y", 50)
                .attr("width", 60)
                .attr("height", 50)
                .attr("class", "jaarGrafiek")
                .attr("text-anchor", "end")
                //                .style("fill", "#e2e2e2")
                .style("fill", "##2d2329")
                .style("opacity", 0)
                .style("font-size", "13px");

            rectGrafiek.append("rect")
                .attr("x", 453)
                .attr("y", 18)
                .attr("width", 140)
                .attr("height", 40)
                .attr("class", "rectGrafiek")
                .style("fill", "#e2e2e2")
                
                .style("opacity", 1)

            var mouseover = function (d) {
                var e = this.attributes.class.value;
                d3.select(".gegevensGrafiek")
                    .style("opacity", 1)
                    .html("Aantal " + e + "'s: " + d[e])
                d3.select(".jaarGrafiek")
                    .style("opacity", 1)
                    .html("in " + d.year)
            };
            //+ " in " + d.year

            var mouseleave = function (d) {
                var e = this.attributes.class.value;
                d3.select(".gegevensGrafiek")
                    .style("opacity", 1)
                    .text("<hover over punten>")
                d3.select(".jaarGrafiek")
                    .style("opacity", 0)
            };

            // Add grutto points
            svg
                .append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "grutto")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.grutto)
                })
                .attr("r", 5)
                .attr("stroke", "#FFFFFF")
                .attr("stroke-width", 2)
                .attr("fill", gruttokleur)
                .on("mouseover", mouseover)
                .on("mouseleave", mouseleave)

            // Add kievit points
            svg
                .append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "kievit")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.kievit)
                })
                .attr("r", 5)
                .attr("stroke", "#FFFFFF")
                .attr("stroke-width", 2)
                .attr("fill", kievitkleur)
                .on("mouseover", mouseover)
                .on("mouseleave", mouseleave)

            // Add scholekster points
            svg
                .append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "scholekster")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.scholekster)
                })
                .attr("r", 5)
                .attr("stroke", "#FFFFFF")
                .attr("stroke-width", 2)
                .attr("fill", scholeksterkleur)
                .on("mouseover", mouseover)
                .on("mouseleave", mouseleave)

            // Add tureluur points
            svg
                .append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "tureluur")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.tureluur)
                })
                .attr("r", 5)
                .attr("stroke", "#FFFFFF")
                .attr("stroke-width", 2)
                .attr("fill", tureluurkleur)
                .on("mouseover", mouseover)
                .on("mouseleave", mouseleave)

            // Add interactive legend
            svg.append("text")
                .attr("class", "grutto_legend")
                .attr("x", 10)
                .attr("y", 10 - (margin.top / 80))
                .attr("text-anchor", "start")
                .style("font-size", "16px")
                .style("fill", gruttokleur)
                .style("font-weight", "600")
                .style("cursor", "pointer")
                .text("Grutto")
                .on("click", function (d) {
                    currentOpacity = d3.selectAll(".grutto").style("opacity")
                    d3.selectAll(".grutto").transition().style("opacity", currentOpacity == 1 ? 0 : 1)
                })

            svg.append("text")
                .attr("class", "kievit_legend")
                .attr("x", 80)
                .attr("y", 10 - (margin.top / 80))
                .attr("text-anchor", "start")
                .style("font-size", "16px")
                .style("fill", kievitkleur)
                .style("font-weight", "600")
                .style("cursor", "pointer")
                .text("Kievit")
                .on("click", function (d) {
                    currentOpacity = d3.selectAll(".kievit").style("opacity")
                    d3.selectAll(".kievit").transition().style("opacity", currentOpacity == 1 ? 0 : 1)
                })

            svg.append("text")
                .attr("class", "scholekster_legend")
                .attr("x", 150)
                .attr("y", 10 - (margin.top / 80))
                .attr("text-anchor", "start")
                .style("font-size", "16px")
                .style("fill", scholeksterkleur)
                .style("font-weight", "600")
                .style("cursor", "pointer")
                .text("Scholekster")
                .on("click", function (d) {
                    currentOpacity = d3.selectAll(".scholekster").style("opacity")
                    d3.selectAll(".scholekster").transition().style("opacity", currentOpacity == 1 ? 0 : 1)
                })

            svg.append("text")
                .attr("class", "tureluur_legend")
                .attr("x", 270)
                .attr("y", 10 - (margin.top / 80))
                .attr("text-anchor", "start")
                .style("font-size", "16px")
                .style("fill", tureluurkleur)
                .style("font-weight", "600")
                .style("cursor", "pointer")
                .text("Tureluur")
                .on("click", function (d) {
                    currentOpacity = d3.selectAll(".tureluur").style("opacity")
                    d3.selectAll(".tureluur").transition().style("opacity", currentOpacity == 1 ? 0 : 1)
                })
        })

});
