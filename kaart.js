$(document).ready(function () {
    //Slider
    d3.select(".selected-slidervalue").text("2017");

    $("#slider").on('input', function () {
        $(".slidercurvalue").text($("#slider").val());
    });

    // Parameters
    var widthmap = 300,
        heightmap = 350,
        scale = 4000,
        centerLat = 5.3,
        centerLong = 52.2,
        selectedjaar = 2017;

    var gruttokleur = "#7A7A99";
    var kievitkleur = "#EFBB87";
    var scholeksterkleur = "#bbc5ef";
    var tureluurkleur = "#E75856";


    // Append svg to class grutto 
    var svg = d3.select(".map_grutto").append("svg")
        .attr("width", widthmap)
        .attr("height", heightmap)
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 350")
        // Class to make it responsive.
        .classed("svg-content-responsive", true)

    var layerProvincesGrutto = svg.append('g');

    var titleGrutto = svg.append('g')
        .attr("class", "layerProvinces");
    var aantalGrutto = svg.append('g');
    var verschilGrutto = svg.append('g');

    // Append svg to class kievit 
    var svg = d3.select(".map_kievit").append("svg")
        .attr("width", widthmap)
        .attr("height", heightmap)
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 350")
        // Class to make it responsive.
        .classed("svg-content-responsive", true)

    var layerProvincesKievit = svg.append('g')
        .attr("class", "layerProvinces");

    var titleKievit = svg.append('g');
    var aantalKievit = svg.append('g');
    var verschilKievit = svg.append('g');

    // Append svg to class scholekster 
    var svg = d3.select(".map_scholekster").append("svg")
        .attr("width", widthmap)
        .attr("height", heightmap)
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 350")
        // Class to make it responsive.
        .classed("svg-content-responsive", true)

    var layerProvincesScholekster = svg.append('g')
        .attr("class", "layerProvinces");

    var titleScholekster = svg.append('g');
    var aantalScholekster = svg.append('g');
    var verschilScholekster = svg.append('g');

    // Append svg to class tureluur 
    var svg = d3.select(".map_tureluur").append("svg")
        .attr("width", widthmap)
        .attr("height", heightmap)
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 350")
        // Class to make it responsive.
        .classed("svg-content-responsive", true)

    var layerProvincesTureluur = svg.append('g')
        .attr("class", "layerProvinces");

    var titleTureluur = svg.append('g');
    var aantalTureluur = svg.append('g');
    var verschilTureluur = svg.append('g');

    //    var svg = d3.select(".legend").append("svg")
    //        .classed("svg-container", true)
    //        .append("svg")
    //        // Responsive SVG needs these 2 attributes and no width and height attr.
    //        .attr("preserveAspectRatio", "xMinYMin meet")
    //        .attr("viewBox", "0 0 700 50")
    //        // Class to make it responsive.
    //        .classed("svg-content-responsive", true)
    //
    //    var legend = svg.append("g");

    var svg = d3.select(".map_vee").append("svg")
        .attr("width", widthmap)
        .attr("height", heightmap)
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 350")
        // Class to make it responsive.
        .classed("svg-content-responsive", true)

    var layerProvincesVee = svg.append('g')
        .attr("class", "layerVee");

    var aantalVee = svg.append('g');


    var svg = d3.select(".map_gemiddelden").append("svg")
        .attr("width", widthmap)
        .attr("height", heightmap)
        .classed("svg-container", true)
        .append("svg")
        // Responsive SVG needs these 2 attributes and no width and height attr.
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 300 350")
        // Class to make it responsive.
        .classed("svg-content-responsive", true)

    var layerProvincesGemiddelden = svg.append('g')
        .attr("class", "layerGemiddelden");

    var aantalGemiddelden = svg.append('g');

    var jaartext = d3.selectAll(".layerProvinces").append("g");

    // Projection  
    var projection = d3.geoMercator()
        .scale(scale).translate([widthmap / 2, heightmap / 2]).center([centerLat, centerLong]);
    var path = d3.geoPath()
        .projection(projection);

    // Data melkvee
    d3.json("melkvee_data2.geojson", function (json) {
        //                        console.log(json);
        layerProvincesVee.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                if (d.properties.procent_dieren_in_2017 == null) {
                    return "#f0f0f0"
                } else {
                    return colors2(d.properties.procent_dieren_in_2017)
                }
            })
            .attr("class", function (d) {
                return "province_vee"
            })
            //            .attr("fill", "#a83803")
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .on("mouseover", mouseover_vee)
            .on("mouseout", mouseout_vee);
    });

    // Data gemiddelden
    d3.json("provincies_gemiddelden_2017.geojson", function (json) {
        //                        console.log(json);
        layerProvincesGemiddelden.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                if (d.properties.gemiddelde == null) {
                    return "#f0f0f0"
                } else {
                    return colors2(d.properties.gemiddelde)
                }
            })
            .attr("class", function (d) {
                return "province_gemiddelde"
            })
            //            .attr("fill", "#a83803")
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .on("mouseover", mouseover_gemiddelde)
            .on("mouseout", mouseout_gemiddelde);
    });

    // Data grutto
    d3.json("provincies_grutto_1990_tot_2017.geojson", function (json) {
        //                        console.log(json);
        layerProvincesGrutto.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                if (d.properties._2017 == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties._2017)
                }
            })
            .attr("class", function (d) {
                return "province_grutto"
            })
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
            .on("mouseover", mouseover_grutto)
            .on("mouseout", mouseout_grutto);
    });

    // Data kievit
    d3.json("provincies_kievit_1990_tot_2017.geojson", function (json) {
        //                        console.log(json);
        layerProvincesKievit.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                if (d.properties._2017 == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties._2017)
                }
            })
            .attr("class", function (d) {
                return "province_kievit"
            })
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
            .on("mouseover", mouseover_kievit)
            .on("mouseout", mouseout_kievit);
    });

    // Data Scholekster
    d3.json("provincies_scholekster_1990_tot_2017.geojson", function (json) {
        //                        console.log(json);
        layerProvincesScholekster.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                if (d.properties._2017 == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties._2017)
                }
            })
            .attr("class", function (d) {
                return "province_scholekster"
            })
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
            .on("mouseover", mouseover_scholekster)
            .on("mouseout", mouseout_scholekster);
    });

    // Data Tureluur
    d3.json("provincies_tureluur_1990_tot_2017.geojson", function (json) {
        //                        console.log(json);
        layerProvincesTureluur.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                if (d.properties._2017 == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties._2017)
                }
            })
            .attr("class", function (d) {
                return "province_tureluur"
            })
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "1")
            .on("mouseover", mouseover_tureluur)
            .on("mouseout", mouseout_tureluur)
    });

    //Slider
    d3.select(".slidervalue")
        .on("change", function (d) {
            selectedjaar = "_" + d3.select(".slidervalue").node().value;
            //            console.log(selectedjaar);

            d3.select(".selected-slidervalue").text(selectedjaar);

            layerProvincesTureluur.selectAll('path').attr("fill", d => {
                if (d.properties[selectedjaar] == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties[selectedjaar])
                }
            });
            layerProvincesScholekster.selectAll('path').attr("fill", d => {
                if (d.properties[selectedjaar] == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties[selectedjaar])
                }
            });
            layerProvincesKievit.selectAll('path').attr("fill", d => {
                if (d.properties[selectedjaar] == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties[selectedjaar])
                }
            });
            layerProvincesGrutto.selectAll('path').attr("fill", d => {
                if (d.properties[selectedjaar] == null) {
                    return "#f0f0f0"
                } else {
                    return colors(d.properties[selectedjaar])
                }
            });
        })

    //Mouseover grutto
    var mouseover_grutto = function (d) {
        selectedjaar = "_" + d3.select(".slidervalue").node().value;
        //               console.log(this)
        d3.selectAll(".province_grutto")
            .transition()
            .duration(200)
            .style("opacity", 0.4)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
        d3.select(".aantalGrutto")
            .style("opacity", 0.9)
            .html(d.properties.statnaam)
        d3.select(".verschilGrutto")
            .style("opacity", 0.9)
            .html(d.properties[selectedjaar])

        //            .html(d=> {
        //                    if (d.properties[selectedjaar] !== "null") {
        //                        return d.properties[selectedjaar]
        //                    } else {
        //                        return "geen gegevens"
        //                    }
        //                })
    };

    var mouseout_grutto = function (d) {
        d3.selectAll(".province_grutto")
            .transition()
            .duration(200)
            .style("opacity", 0.9)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
        d3.select(".aantalGrutto")
            .style("opacity", 0)
            .html("hover over kaart")
        d3.select(".verschilGrutto")
            .style("opacity", 0)
    };

    //Mouseover kievit
    var mouseover_kievit = function (d) {
        selectedjaar = "_" + d3.select(".slidervalue").node().value;
        //               console.log(this)
        d3.selectAll(".province_kievit")
            .transition()
            .duration(200)
            .style("opacity", 0.4)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
        d3.select(".aantalKievit")
            .style("opacity", 0.9)
            .html(d.properties.statnaam)
        d3.select(".verschilKievit")
            .style("opacity", 0.9)
            .html(d.properties[selectedjaar])
    };

    var mouseout_kievit = function (d) {
        d3.selectAll(".province_kievit")
            .transition()
            .duration(200)
            .style("opacity", 0.9)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
        d3.select(".aantalKievit")
            .style("opacity", 0)
        d3.select(".verschilKievit")
            .style("opacity", 0)
    };

    //Mouseover scholekster
    var mouseover_scholekster = function (d) {
        selectedjaar = "_" + d3.select(".slidervalue").node().value;
        //        console.log(this) 
        d3.selectAll(".province_scholekster")
            .transition()
            .duration(200)
            .style("opacity", 0.4)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
        d3.select(".aantalScholekster")
            .style("opacity", 0.9)
            .html(d.properties.statnaam)
        d3.select(".verschilScholekster")
            .style("opacity", 0.9)
            .html(d.properties[selectedjaar])
    };

    var mouseout_scholekster = function (d) {
        d3.selectAll(".province_scholekster")
            .transition()
            .duration(200)
            .style("opacity", 0.9)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
        d3.select(".aantalScholekster")
            .style("opacity", 0)
        d3.select(".verschilScholekster")
            .style("opacity", 0)
    };

    //Mouseover tureluur
    var mouseover_tureluur = function (d) {
        selectedjaar = "_" + d3.select(".slidervalue").node().value;
        //        console.log(this) 
        d3.selectAll(".province_tureluur")
            .transition()
            .duration(200)
            .style("opacity", 0.4)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
        d3.select(".aantalTureluur")
            .style("opacity", 0.9)
            .html(d.properties.statnaam)
        d3.select(".verschilTureluur")
            .style("opacity", 0.9)
            .html(d.properties[selectedjaar])
    };

    var mouseout_tureluur = function (d) {
        d3.selectAll(".province_tureluur")
            .transition()
            .duration(200)
            .style("opacity", 0.9)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
        d3.select(".aantalTureluur")
            .style("opacity", 0)
        d3.select(".verschilTureluur")
            .style("opacity", 0)
    };

    var mouseover_vee = function (d) {
        d3.selectAll(".province_vee")
            .transition()
            .duration(200)
            .style("opacity", 0.4)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
        d3.select(".aantalVee")
            .style("opacity", 0.9)
            .html(d.properties.procent_dieren_in_2017)
    };

    var mouseout_vee = function (d) {
        d3.selectAll(".province_vee")
            .transition()
            .duration(200)
            .style("opacity", 0.9)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
        d3.select(".aantalVee")
            .style("opacity", 0)
    };


    //functie gemiddelden
    var mouseover_gemiddelde = function (d) {
        d3.selectAll(".province_gemiddelde")
            .transition()
            .duration(200)
            .style("opacity", 0.4)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
        d3.select(".aantalGemiddelden")
            .style("opacity", 0.9)
            .html(d.properties.gemiddelde)
//            .html("hoi")
    };

    var mouseout_gemiddelde = function (d) {
        d3.selectAll(".province_gemiddelde")
            .transition()
            .duration(200)
            .style("opacity", 0.9)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "#ffffff")
            .style("stroke-width", "1.5")
            .style("opacity", "0.9")
        d3.select(".aantalGemiddelden")
            .style("opacity", 0)
    };

    //Kleurenschema
    var color_domain = [0, 20, 40, 70, 90, 120, 150]
    //    var color_domain = [10, 40, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156]
    var ext_color_domain = [0, 20, 40, 70, 90, 120, 150]
    //   var ext_color_domain = [0, 16, 32, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156]
    var legend_labels = ["< 20", "20 - 40", "40 - 70", "70 - 90", "90 - 120", "120 - 150", "> 150"]
    //   var legend_labels = ["< 16", "16 - 32", "32 - 48", "48 - 60", "60 - 72", "72 - 84", "84 - 96", "96 - 108", "108 - 120", "120 - 132", "132 - 144", "144 - 156", "> 156"]

    var colors = d3.scaleQuantile()
        .domain(color_domain)
        //        ([3, 188])
        //        .range(["#f2f9f2", "#e1eae1", "#b9c0b6", "#949b8f", "#545b4f", "#3a4237", "#1e281d"])
        .range(["#f2f2eb", "#dddfd2", "#aeb0a2", "#828578", "#5d6154", "#3b4237", "#1e281d"])
    //.range(["#F4F4F4", "#E0DFDF", "#AEABAC", "#807E7E", "#595757", "#373536", "#191919"])
    //        .range(["#f9fce8", "#ecf2d6", "#d4dabd", "#bdc4a6", "#a7b090", "#929c7c", "#7e8a6a", "#6b7959", "#596a4a", "#485b3c", "#384e30", "#294325", "#1a381d"])
    ;

    var colors2 = d3.scaleQuantile()
        .domain([28, 86])
        .range(["#f2f2eb", "#dddfd2", "#aeb0a2", "#828578", "#5d6154", "#3b4237", "#1e281d"])

    //Adding legend for Choropleth

    //    legend = svg.selectAll("svg")
    //        //    legend.append("svg")
    //        .data(ext_color_domain)
    //        .enter()
    //        .append("svg")
    //        .attr("class", "legend");

    var ls_w = 30,
        ls_h = 30;

    //    legend.append("rect")
    //        .attr("y", 30)
    //        .attr("x", function (d, i) {
    //            return (i * 100);
    //        })
    //        //        .attr("y", 8)
    //        .attr("width", ls_w)
    //        .attr("height", ls_h)
    //        .style("fill", function (d, i) {
    //            return colors(d);
    //        })
    //        .style("stroke", "#ffffff")
    //        .style("stroke-width", "2")
    //        .style("opacity", 0.9);
    //
    //    legend.append("text")
    //        .attr("y", 50)
    //        .attr("x", function (d, i) {
    //            return (i * 100) + 32;
    //        })
    //        .style("font-size", "16px")
    //        .text(function (d, i) {
    //            return legend_labels[i];
    //        });

    var title_w = 10,
        title_h = 17;

    //Grutto
    titleGrutto.append("text")
        .attr("class", "title")
        .attr("x", title_w)
        .attr("y", title_h)
        .text('Grutto')
        .style("font-size", "1.4em")
        .style("fill", gruttokleur)
        .style("font-weight", "600")

    aantalGrutto.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 47)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "aantalGrutto")
        .style("fill", ("#707070"))
        .style("opacity", 0.9)
        .style("font-size", "14px")
    //        .html("hover over kaart")

    verschilGrutto.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 75)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "verschilGrutto")
        .style("fill", ("#707070"))
        .style("opacity", 0)
        .style("font-size", "25px")

    //Kievit
    titleKievit.append("text")
        .attr("class", "title")
        .attr("x", title_w)
        .attr("y", title_h)
        .text('Kievit')
        .style("font-size", "1.4em")
        .style("fill", kievitkleur)
        .style("font-weight", "600")

    aantalKievit.append("text", )
        .attr("x", title_w)
        .attr("y", title_h + 47)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "aantalKievit")
        .style("fill", ("#707070"))
        .style("opacity", 0)
        .style("font-size", "14px")

    verschilKievit.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 75)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "verschilKievit")
        .style("fill", ("#707070"))
        .style("opacity", 0)
        .style("font-size", "25px")

    //Scholekster
    titleScholekster.append("text")
        .attr("class", "title")
        .attr("x", title_w)
        .attr("y", title_h)
        .text('Scholekster')
        .style("font-size", "1.4em")
        .style("fill", scholeksterkleur)
        .style("font-weight", "600")

    aantalScholekster.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 47)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "aantalScholekster")
        .style("fill", ("#707070"))
        .style("opacity", 0)
        .style("font-size", "14px")

    verschilScholekster.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 75)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "verschilScholekster")
        .style("fill", ("#707070"))
        .style("opacity", 0)
        .style("font-size", "25px")

    //Tureluur
    titleTureluur.append("text")
        .attr("class", "title")
        .attr("x", title_w)
        .attr("y", title_h)
        .text('Tureluur')
        .style("font-size", "1.4em")
        .style("fill", tureluurkleur)
        .style("font-weight", "600")

    aantalTureluur.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 47)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "aantalTureluur")
        .style("fill", "#707070")
        .style("opacity", 0)
        .style("font-size", "14px")

    verschilTureluur.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 75)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "verschilTureluur")
        .style("fill", ("#707070"))
        .style("opacity", 0)
        .style("font-size", "25px")

    jaartext.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 25)
        .attr("width", 60)
        .attr("height", 500)
        .text("2017")
        .attr("class", "slidercurvalue")
        .style("font-size", "15px")
        .style("fill", "#707070")

    aantalVee.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 42)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "aantalVee")
        .style("fill", "#707070")
        .style("opacity", 0)
        .style("font-size", "40px")

    aantalGemiddelden.append("text")
        .attr("x", title_w)
        .attr("y", title_h + 42)
        .attr("width", 60)
        .attr("height", 50)
        .attr("class", "aantalGemiddelden")
        .style("fill", "#707070")
        .style("opacity", 0)
        .style("font-size", "40px")

});
