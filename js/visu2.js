// Definition de la taille du svg
const marginVisu2 = { top: 20, right: 25, bottom: 20, left: 25 },
  widthVisu2 = 450 - marginVisu2.left - marginVisu2.right,
  heightVisu2 = 300 - marginVisu2.top - marginVisu2.bottom;
console.log(widthVisu2);
console.log(heightVisu2);

var compteur = widthVisu2;
var tooltipVisu2 = d3
  .select("#visu2")
  .append("div")
  .attr("class", "hidden tooltipVisu2");

// ajout du svg
var svgVisu2 = d3
  .select("#visu2")
  .append("svg")
  .attr("width", widthVisu2 + marginVisu2.left + marginVisu2.right)
  .attr("height", heightVisu2 + marginVisu2.top + marginVisu2.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginVisu2.left + "," + marginVisu2.top + ")"
  );

var miniVisActuelle = 0;

// donnees rendement agricole
d3.json("data/rendementCerealesMonde.json").then(function (dataRendement) {
  let horizontalScaleVisu2 = d3
    .scaleLinear()
    .domain([0, dataRendement.length - 1])
    .range([0, widthVisu2]);

  let verticalScaleVisu2 = d3.scaleLinear();
  verticalScaleVisu2.domain([2500, 4100]).range([0, heightVisu2]);

  svgVisu2
    .selectAll("barre")
    .data(dataRendement)
    .enter()
    .append("rect")
    .attr("x", (d, t) => horizontalScaleVisu2(t))
    .attr("y", (d) => heightVisu2 - verticalScaleVisu2(d.Valeur))
    .attr("height", (d) => verticalScaleVisu2(d.Valeur))
    .attr("width", 10)
    .style("fill", "red")
    .on("mousemove", function (event, d) {
      var mousePosition = d3.pointer(event);
      tooltipVisu2
        .classed("hidden", false)
        .attr(
          "style",
          "left:" +
            (mousePosition[0] + 15) +
            "px; top:" +
            (mousePosition[1] - 15) +
            "px"
        )
        .html(d.Annee + " : " + d.Valeur + "kg/ha");
    })
    .on("mouseout", function () {
      tooltipVisu2.classed("hidden", true);
    });
});
svgVisu2
  .append("rect")
  .attr("x", 20)
  .attr("y", 20)
  .attr("height", 25)
  .attr("width", 50)
  .attr("fill", "yellow")
  .on("click", manageChangeVisu2);
svgVisu2
  .append("text")
  .attr("x", 20)
  .attr("y", 20 + 18)
  .text("Cliquez")
  .text("Cliquez")
  .on("click", manageChangeVisu2);

function manageChangeVisu2() {
  if (miniVisActuelle === 0) {
    svgVisu2.selectAll(".pesticides").classed("hidden", false);
    svgVisu2.selectAll(".terresCultivees").classed("hidden", true);
  } else {
    svgVisu2.selectAll(".pesticides").classed("hidden", true);
    svgVisu2.selectAll(".terresCultivees").classed("hidden", false);
  }
  miniVisActuelle = 1 - miniVisActuelle;
}

// donnees pesticides
d3.json("data/pesticides.json").then(function (dataPesticides) {
  let horizontalScaleVisu2 = d3
    .scaleLinear()
    .domain([0, dataPesticides.length - 1])
    .range([0, widthVisu2]);

  let verticalScaleVisu2 = d3.scaleLinear();
  verticalScaleVisu2.domain([1.5, 2.7]).range([0, heightVisu2]);

  svgVisu2
    .selectAll("point")
    .data(dataPesticides)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", (d, t) => horizontalScaleVisu2(t) + 5)
    .attr("cy", (d) => heightVisu2 - verticalScaleVisu2(d.Valeur))
    .style("fill", "gray")
    .attr("class", "pesticides")
    .classed("hidden", true)
    .on("mousemove", function (event, d) {
      var mousePosition = d3.pointer(event);

      tooltipVisu2
        .classed("hidden", false)
        .attr(
          "style",
          "left:" +
            (mousePosition[0] + 15) +
            "px; top:" +
            (mousePosition[1] - 15) +
            "px"
        )
        .html(d.Annee + " : " + d.Valeur + "kg/ha");
    })
    .on("mouseout", function () {
      tooltipVisu2.classed("hidden", true);
    });

  var i;
  for (i = 0; i < dataPesticides.length - 1; i++) {
    svgVisu2
      .append("line")
      .style("stroke", "black") // colour the line
      .attr("x1", horizontalScaleVisu2(i) + 5) // x position of the first end of the line
      .attr("y1", heightVisu2 - verticalScaleVisu2(dataPesticides[i].Valeur)) // y position of the first end of the line
      .attr("x2", horizontalScaleVisu2(i + 1) + 5) // x position of the second end of the line
      .attr(
        "y2",
        heightVisu2 - verticalScaleVisu2(dataPesticides[i + 1].Valeur)
      ) // y position of the second end of the line;
      .attr("class", "pesticides")
      .classed("hidden", true);
    // legende
    if (i % 5 === 0) {
      svgVisu2
        .append("text")
        .text(dataPesticides[i].Annee)
        .attr("x", horizontalScaleVisu2(i) - 10)
        .attr("y", heightVisu2 + 15);
    }
  }
  // legende (derniere annee)
  svgVisu2
    .append("text")
    .text(dataPesticides[dataPesticides.length - 1].Annee)
    .attr("x", horizontalScaleVisu2(dataPesticides.length - 1) - 10)
    .attr("y", heightVisu2 + 15);
});

// donnees terres cultivees
d3.json("data/proportionsTerresCultivees.json").then(function (dataCulture) {
  let horizontalScaleVisu2 = d3
    .scaleLinear()
    .domain([0, dataCulture.length - 1])
    .range([0, widthVisu2]);

  let verticalScaleVisu2 = d3.scaleLinear();
  verticalScaleVisu2.domain([10, 12.1]).range([0, heightVisu2]);

  svgVisu2
    .selectAll("point")
    .data(dataCulture)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", (d, t) => horizontalScaleVisu2(t) + 5)
    .attr("cy", (d) => heightVisu2 - verticalScaleVisu2(d.Valeur))
    .style("fill", "gray")
    .attr("class", "terresCultivees")
    .classed("hidden", false)
    .on("mousemove", function (event, d) {
      var mousePosition = d3.pointer(event);

      tooltipVisu2
        .classed("hidden", false)
        .attr(
          "style",
          "left:" +
            (mousePosition[0] + 15) +
            "px; top:" +
            (mousePosition[1] - 15) +
            "px"
        )
        .html(d.Annee + " : " + d.Valeur + "%");
    })
    .on("mouseout", function () {
      tooltipVisu2.classed("hidden", true);
    });

  var i;
  for (i = 1; i < dataCulture.length; i++) {
    svgVisu2
      .append("line")
      .style("stroke", "black") // colour the line
      .attr("x1", horizontalScaleVisu2(i - 1) + 5) // x position of the first end of the line
      .attr("y1", heightVisu2 - verticalScaleVisu2(dataCulture[i - 1].Valeur)) // y position of the first end of the line
      .attr("x2", horizontalScaleVisu2(i) + 5) // x position of the second end of the line
      .attr("y2", heightVisu2 - verticalScaleVisu2(dataCulture[i].Valeur)) // y position of the second end of the line;
      .attr("class", "terresCultivees")
      .classed("hidden", false);
  }
});
