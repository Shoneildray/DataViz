const marginVisu3 = { top: 60, right: 80, bottom: 30, left: 60 },
  widthVisu3 = 700 - marginVisu3.left - marginVisu3.right,
  heightVisu3 = 500 - marginVisu3.top - marginVisu3.bottom;

var tooltipVisu3 = d3
  .select("#visu3")
  .append("div")
  .attr("class", "hidden tooltipVisu3");

// ajout du svg
var svgVisu3 = d3
  .select("#visu3")
  .append("svg")
  .attr("width", widthVisu3 + marginVisu3.left + marginVisu3.right)
  .attr("height", heightVisu3 + marginVisu3.top + marginVisu3.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" + marginVisu3.left + "," + marginVisu3.top + ")"
  );

var miniVisuActuelle = 0;

// donnees rendement agricole
d3.json("data/rendementCerealesMonde.json").then(function (dataRendement) {
  let horizontalScaleVisu3 = d3
    .scaleLinear()
    .domain([0, dataRendement.length - 1])
    .range([0, widthVisu3]);

  let verticalScale1 = d3.scaleLinear();
  verticalScale1.domain([4100, 2500]).range([0, heightVisu3]);

  /*const xAxis = d3.axisBottom(horizontalScaleVisu3);
  svgVisu3
    .append("g")
    .attr("transform", "translate(4," + (heightVisu3 + 5) + ")")
    .call(xAxis);*/
  const yAxis1 = d3.axisRight(verticalScale1);
  svgVisu3
    .append("g")
    .style("color", "#708090")
    .attr("transform", "translate(" + (widthVisu3 + 20) + ",0)")
    .call(yAxis1);

  svgVisu3
    .selectAll("barre")
    .data(dataRendement)
    .enter()
    .append("rect")
    .attr("x", (d, t) => horizontalScaleVisu3(t))
    .attr("y", (d) => verticalScale1(d.Valeur))
    .attr("height", (d) => heightVisu3 - verticalScale1(d.Valeur))
    .attr("width", 14)
    .style("fill", "#708090")
    .on("mouseover", function () {
      d3.select(this).style("fill", "#596673");
    })
    .on("mousemove", function (event, d) {
      var mousePosition = d3.pointer(event);
      tooltipVisu3
        .classed("hidden", false)
        .attr(
          "style",
          "left:" +
            (mousePosition[0] + 480) +
            "px; top:" +
            (mousePosition[1] + 475) +
            "px"
        )
        .html(d.Annee + " : " + d.Valeur + "kg/ha");
    })
    .on("mouseout", function () {
      d3.select(this).style("fill", "#708090");
      tooltipVisu3.classed("hidden", true);
    });
});

// donnees pesticides
d3.json("data/pesticides.json").then(function (dataPesticides) {
  let horizontalScaleVisu3 = d3
    .scaleLinear()
    .domain([0, dataPesticides.length - 1])
    .range([0, widthVisu3]);

  let verticalScale2 = d3.scaleLinear();
  verticalScale2.domain([2.8, 1.3]).range([0, heightVisu3]);

  const yAxis2 = d3.axisLeft(verticalScale2);
  svgVisu3
    .append("g")
    .style("color", "#e65119")
    .attr("class", "pesticides")
    .attr("transform", "translate(-10,0)")
    .classed("hidden", true)
    .call(yAxis2);

  for (var i = 0; i < dataPesticides.length - 1; i++) {
    svgVisu3
      .append("line")
      .style("stroke", "#e65119")
      .attr("x1", horizontalScaleVisu3(i) + 7) // x position of the first end of the line
      .attr("y1", verticalScale2(dataPesticides[i].Valeur)) // y position of the first end of the line
      .attr("x2", horizontalScaleVisu3(i + 1) + 7) // x position of the second end of the line
      .attr("y2", verticalScale2(dataPesticides[i + 1].Valeur)) // y position of the second end of the line;
      .attr("stroke-width", 2)
      .attr("class", "pesticides")
      .classed("hidden", true);

    // legende
    if (i % 5 === 0) {
      svgVisu3
        .append("text")
        .text(dataPesticides[i].Annee)
        .attr("x", horizontalScaleVisu3(i) - 10)
        .attr("y", heightVisu3 + 15);
    }
  }

  svgVisu3
    .selectAll("point")
    .data(dataPesticides)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", (d, t) => horizontalScaleVisu3(t) + 7)
    .attr("cy", (d) => verticalScale2(d.Valeur))
    .style("fill", "#e65119")
    .attr("class", "pesticides")
    .classed("hidden", true)
    .on("mouseover", function () {
      d3.select(this).style("fill", "#b84114");
    })
    .on("mousemove", function (event, d) {
      var mousePosition = d3.pointer(event);

      tooltipVisu3
        .classed("hidden", false)
        .attr(
          "style",
          "left:" +
            (mousePosition[0] + 480) +
            "px; top:" +
            (mousePosition[1] + 475) +
            "px"
        )
        .html(d.Annee + " : " + d.Valeur + "kg/ha");
    })
    .on("mouseout", function () {
      d3.select(this).style("fill", "#e65119");
      tooltipVisu3.classed("hidden", true);
    });
  // legende (derniere annee)
  svgVisu3
    .append("text")
    .text(dataPesticides[dataPesticides.length - 1].Annee)
    .attr("x", horizontalScaleVisu3(dataPesticides.length - 1) - 11)
    .attr("y", heightVisu3 + 15);
});

// donnees terres cultivees
d3.json("data/proportionsTerresCultivees.json").then(function (dataCulture) {
  let horizontalScaleVisu3 = d3
    .scaleLinear()
    .domain([0, dataCulture.length - 1])
    .range([0, widthVisu3]);

  let verticalScale3 = d3.scaleLinear();
  verticalScale3.domain([12.5, 10]).range([0, heightVisu3]);

  const yAxis3 = d3.axisLeft(verticalScale3);
  svgVisu3
    .append("g")
    .style("color", "#42be42")
    .attr("class", "terresCultivees")
    .attr("transform", "translate(-10 ,0)")
    .call(yAxis3);

  for (var i = 1; i < dataCulture.length; i++) {
    svgVisu3
      .append("line")
      .style("stroke", "#42be42") // colour the line
      .attr("x1", horizontalScaleVisu3(i - 1) + 7) // x position of the first end of the line
      .attr("y1", verticalScale3(dataCulture[i - 1].Valeur)) // y position of the first end of the line
      .attr("x2", horizontalScaleVisu3(i) + 7) // x position of the second end of the line
      .attr("y2", verticalScale3(dataCulture[i].Valeur)) // y position of the second end of the line;
      .attr("stroke-width", 2)
      .attr("class", "terresCultivees")
      .classed("hidden", false);
  }

  svgVisu3
    .selectAll("point")
    .data(dataCulture)
    .enter()
    .append("circle")
    .attr("r", 6)
    .attr("cx", (d, t) => horizontalScaleVisu3(t) + 7)
    .attr("cy", (d) => verticalScale3(d.Valeur))
    .style("fill", "#42be42")
    .attr("class", "terresCultivees")
    .classed("hidden", false)
    .on("mouseover", function () {
      d3.select(this).style("fill", "#349834");
    })
    .on("mousemove", function (event, d) {
      var mousePosition = d3.pointer(event);

      tooltipVisu3
        .classed("hidden", false)
        .attr(
          "style",
          "left:" +
            (mousePosition[0] + 480) +
            "px; top:" +
            (mousePosition[1] + 475) +
            "px"
        )
        .html(d.Annee + " : " + d.Valeur + "%");
    })
    .on("mouseout", function () {
      d3.select(this).style("fill", "#42be42");
      tooltipVisu3.classed("hidden", true);
    });
});

svgVisu3
  .append("text")
  .attr("y", -40)
  .attr("x", 180)
  .attr("class", "terresCultivees")
  .text("Cliquez sur la visualisation")
  // .text(
  //   "L'augmentation du rendement des terres cultivées permet de \n limiter l'augmentation de la proportion de terres cultivées..."
  // )
  .style("white-space", "pre-line");

svgVisu3
  .append("text")
  .attr("y", -40)
  .attr("x", 65)
  .attr("class", "pesticides")
  .classed("hidden", true)
  .text("...mais cela se fait notamment au prix d'une utilisation")
  .style("white-space", "pre-line");

svgVisu3
  .append("text")
  .attr("y", -20)
  .attr("x", 65)
  .attr("class", "pesticides")
  .classed("hidden", true)
  .text("toujours plus intensive des pesticides dans les cultures !")
  .style("white-space", "pre-line");

// titres des axes
svgVisu3
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", widthVisu3 + 74)
  .attr("x", -heightVisu3 / 2 - 210)
  .attr("fill", "#708090")
  .text("Rendement annuel moyen des terres cultivées (kg/ha)");

svgVisu3
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -46)
  .attr("x", -heightVisu3 / 2 - 182)
  .attr("fill", "#42be42")
  .attr("class", "terresCultivees")
  .text("Proportion mondiale de terres cultivées (%)");

svgVisu3
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -46)
  .attr("x", -heightVisu3 / 2 - 200)
  .attr("fill", "#e65119")
  .attr("class", "pesticides")
  .classed("hidden", true)
  .text("Utilisation annuelle moyenne de pesticides (kg/ha)");

// gestion de l'alternance des deux courbes
function manageChange() {
  if (miniVisuActuelle === 0) {
    svgVisu3.selectAll(".pesticides").classed("hidden", false);
    svgVisu3.selectAll(".pesticides").raise();
    svgVisu3.selectAll(".terresCultivees").classed("hidden", true);
  } else {
    svgVisu3.selectAll(".pesticides").classed("hidden", true);
    svgVisu3.selectAll(".terresCultivees").raise();
    svgVisu3.selectAll(".terresCultivees").classed("hidden", false);
  }
  miniVisuActuelle = 1 - miniVisuActuelle;
}

d3.select("#visu3").on("click", manageChange);
