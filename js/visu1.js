//svg
const width = 1800;
const height = 740;

var svg = d3
  .select("#visu1")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

//makeSelector();

// read data

d3.csv("data/visu1.csv").then((data) => {
  console.log(data);
  data.forEach(function (d) {
    d.Disponibilite = parseFloat(parseFloat(d.Disponibilite).toFixed(3));
    //permet de transformer une chaîne de caractères en un nombre flottant après avoir analysée celle-ci
    d.Co2 = parseFloat(parseFloat(d.Co2).toFixed(3));
    //console.log(typeof d.Co2);
  });

  //La méthode Array.from() permet de créer une nouvelle instance d'Array
  // new Set permet de créer un set sans doublon
  // Labels Produits
  let products = Array.from(new Set(data.map((d) => d.Product)));
  // Labels Animal/Non-Animal
  let idh_catego = Array.from(new Set(data.map((d) => d.idh_catego)));
  console.log(idh_catego);
  //Pays labels
  let pays_labels = Array.from(new Set(data.map((d) => d.Pays)));
  console.log(pays_labels);

  // Select menu
  // add the options to the button
  d3.select("#selectButton")
    .selectAll("myOptions")
    .data(pays_labels)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    }); // corresponding value returned

  //Définition des échelles X, Y, des couleurs et des echelles

  // L'axe X : Utilisation de l'échelle ordinale (produit = var catégorielle)
  // pour représenter les 11 produits de notre ensemble de données
  //en 11 coordonnées sur l'axe des x

  let xCoords = products.map((d, i) => 120 + i * 100);
  var xScale = d3.scaleOrdinal().domain(products).range(xCoords);

  // Add the x Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + (height - 20) + ")")
    .attr("id", "x-axis")
    .call(d3.axisBottom(xScale));

  // L'axe Y : la varible Intensite des emissions en Co2 kg/person/year,
  //Comme les coordonnées sur un écran d'ordinateur commencent par (0,0)
  //dans le coin supérieur gauche, le bas de du graphique aura la valeur y maximale
  // et le haut du graphique aura la valeur minimale.

  /// Dynamic y axis
  var y = d3
    .scaleLinear()
    .domain([
      d3.min(data, function (d) {
        return d.Co2;
      }),
      d3.max(data, function (d) {
        return d.Co2 + 60;
      })
    ])
    .range([height - 50, 50]);

  // Add the y Axis

  var yAxis = svg
    .append("g")
    .attr("class", "myYaxis")
    .attr("transform", "translate(60,0)");

  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  //création d'une échelle de couleurs pour que chacun de nos 11 produits ait sa propre couleur.
  //???????????????????????????????
  let color = d3.scaleOrdinal().domain(idh_catego).range(["pink", "red"]);

  // Mapper les intenssites des emissions(Kg CO2/person/year) au rayon des cercles
  let co2_Domain = d3.extent(data.map((d) => d.Co2)); //[0,1463.776042]
  co2_Domain = co2_Domain.map((d) => d);
  // le rayon du cercle va varier entre 5-30px
  var size = d3.scaleLinear().domain(co2_Domain).range([2, 25]);

  // Legend
  svg
    .append("text")
    .attr("x", 1220)
    .attr("y", 20)
    .text("- Légende -")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");
  svg
    .append("circle")
    .attr("cx", 1200)
    .attr("cy", 50)
    .attr("r", 6)
    .style("fill", "red");
  svg
    .append("circle")
    .attr("cx", 1200)
    .attr("cy", 80)
    .attr("r", 6)
    .style("fill", "pink");
  svg
    .append("text")
    .attr("x", 1220)
    .attr("y", 50)
    .text("Pays développé")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");
  svg
    .append("text")
    .attr("x", 1220)
    .attr("y", 80)
    .text("Pays en développement")
    .style("font-size", "15px")
    .attr("alignment-baseline", "middle");

  // tool tip
  var tooltipVisu = d3
    .select("#visu1")
    .append("div")
    .attr("class", "tooltipVisu1")
    .style("opacity", 0)
    .style("padding", "8px");

  ///////////////////////////////////////////////////////////// Init
  // init();
  // function init() {
  var chart = svg
    .append("g")
    .selectAll(".circ")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circ")
    .attr("stroke", "black")
    .attr("fill", (d) => color(d.idh_catego))
    .attr("r", (d) => size(d.Co2))
    .attr("cx", (d) => xScale(d.Product))
    .attr("cy", (d) => y(d.Co2))
    // déclencher quand on survole le cercle
    .on("mousemove", function (event, d) {
      var mousePosition = d3.pointer(event);
      tooltipVisu.style("opacity", 0.85);
      tooltipVisu
        .html(
          "<h2> " +
            d.Pays +
            "</h2><p> Disponibilité : " +
            d.Disponibilite +
            " kg/personne/an </p> <p> Emission Co2 : " +
            d.Co2 +
            " Kg Co2eq/personne/an </p>  "
        )
        .style("left", mousePosition[0] - 220 + "px")
        .style("top", mousePosition[1] + 20 + "px");

      d3.select(this).attr("r", (d) => size(d.Co2 * 3));
    })

    .on("mouseout", function (d) {
      chart.attr("r", (d) => size(d.Co2));
      tooltipVisu.style("opacity", 0);
    });

  // Animation / Simulation
  d3.selectAll(".circ").style("opacity", "0");

  d3.selectAll(".circ").transition().duration(4000).style("opacity", "1");

  ////////////////////////////////////////////////////
  //force d'attraction : le graphe est orienté verticalement de sorte que chaque
  //point est attiré par la même coordonnée x.
  //Pour éviter le chevauchement des cercles : "forceCollide" fonction utile qui fait que les
  // repoussent les uns des autres, il suffit de spécifier le rayon à partir duquel la force
  //sera exercée. Rq:  le rayon de la force de collision soit égal au rayon du cercle auquel
  // il est lié
  // link : https://github.com/d3/d3-force//
  //////////////////////////////////////////////////

  let simulation = d3
    .forceSimulation(data) //Crée une nouvelle simulation avec l'ensemble des points spécifié et sans forces
    .force(
      //force:attribue la force pour la variable spécifiée et renvoie cette simulation.
      "x",
      d3
        .forceX((d) => {
          //force:attribue la force pour la variable spécifiée et renvoie cette simulation.
          return xScale(d.Product); //strength : définit la force avec laquelle nos éléments seront poussés vers leurs nouveaux emplacements
        })
        // .strength(0.5)
        .strength(0.5)
    )
    .force(
      "y",
      d3
        .forceY(function (d) {
          return y(d.Co2);
        })
        .strength(0.5)
    )
    .force(
      "collide",
      d3.forceCollide((d) => {
        // Crée une nouvelle force de collision circulaire avec le rayon spécifié a co2
        return size(d.Co2 * 1.1);
      })
    )
    .alphaDecay(0)
    .alpha(0.3) // how quickly the simulation advances
    .on("tick", tick);

  //Une simulation de force se déroule de manière itérative en ticks,
  // que l'on peut considérer comme des images d'animation,
  //La simulation des forces attribue des propriétés supplémentaires
  //à nos données, y compris les positions et les vitesses de tous
  //les éléments de chaque tick. Il faut mettre à jour l'emplacement
  //des éléments de notre cercle sur chaque tick en se référant
  //aux positions x et y simulées

  function tick() {
    d3.selectAll(".circ")
      .attr("cx", (d) => {
        return d.x;
      })
      .attr("cy", (d) => d.y);
  }

  //Attribution d'une décroissance de force qui s'initialise quelques
  // secondes après le positionnement des éléments.
  //L'application d'un Decay permet de désactiver les forces
  //d'une facon continue après le positionnement des tous les éléments.

  let init_decay = setTimeout(function () {
    console.log("start alpha decay");
    simulation.alphaDecay(0.05); // start decay after 2 seconds
    //} end init()

    //////// update on change
    d3.select("#selectButton").on("change", function (d) {
      //récuperer le pays choisi
      var selected_pays = d3.select(this).property("value");
      // executer la fonction update
      console.log(selected_pays);
      //chart.selectAll(".circ").exit().remove();
      update(selected_pays);
    });

    ////////////////////////////////////////////////////////// fonction to update the chart
    function update(selected_pays) {
      d3.selectAll(".circ").remove();
      console.log("circles removed");
      console.log("pays selectionné :");
      console.log(selected_pays);
      // Create data
      var dataFilter = data.filter(function (d) {
        if (selected_pays == "Monde") {
          //size = d3.scaleLinear().domain(co2_Domain).range([2, 25]);
          location.reload();
          // init();
          return;
        } else {
          size = d3.scaleLinear().domain(co2_Domain).range([10, 40]);
          return d.Pays == selected_pays;
        }
      });
      console.log("data filter");
      console.log(dataFilter);

      //update axis/////////////////
      //x Axis
      var xScale = d3.scaleOrdinal().domain(products).range(xCoords);
      svg
        .append("g")
        .attr("transform", "translate(0," + (height - 20) + ")")
        .attr("id", "x-axis")

        .call(d3.axisBottom(xScale));

      // update Y axis

      y.domain([
        0,
        d3.max(dataFilter, function (d) {
          return d.Co2 + 60;
        })
      ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

      // Select the section we want to apply our changes to
      //var svg = d3.select("body").transition();

      // Make the changes

      //svg.select("g").attr("transform", "translate(" + 50 + ",0)");
      console.log("axis update");

      //var u = svg.selectAll("rect").data(dataFilter);

      // u.enter()
      //   .append(".circ") // Add a new rect for each new elements
      //   .merge(u) // get the already existing elements as well
      //   .transition() // and apply changes to all of them
      //   .duration(1000)
      //   .attr("x", function (d) {
      //     return x(d.Product);
      //   })
      //   .attr("y", function (d) {
      //     return y(d.Emission);
      //   })
      //   .attr("width", x.bandwidth())
      //   .attr("height", function (d) {
      //     return height - y(d.Emission);
      //   })
      //   .attr("fill", "#69b3a2");
      //chart.selectAll(.circ).exit().remove();

      // update chart
      console.log("show new circles");
      chart = svg
        .append("g")
        .selectAll(".circ")
        .data(dataFilter)
        .enter()
        .append("circle")
        .attr("stroke", "black")
        .attr("class", "circ")
        .transition()
        .duration(1000)
        .attr("fill", (d) => color(d.idh_catego))
        .attr("r", (d) => size(d["Co2"]))
        .attr("cx", (d) => xScale(d.Product))
        .attr("cy", (d) => y(d.Co2));

      svg
        .selectAll(".circ")
        .on("mouseover", function (d) {
          tooltipVisu.style("opacity", 0.9);
          tooltipVisu
            .html(
              "<h2> " +
                d.Pays +
                "</h2><p> Disponibilité : " +
                d.Disponibilite +
                " kg/personne/an </p> <p> Emission Co2 : " +
                d.Co2 +
                " Kg Co2eq/personne/an </p>  "
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function (d) {
          tooltipVisu.style("opacity", 0);
        });

      console.log(" new circles showed");
    }

    ////////////////////////////////////////////////////
  });
});

//

// // Create countries selector
// function makeSelector() {
//   //
//   var visu = document.getElementById("visu1");

//   // default option
//   var opt = document.createElement("option");
//   opt.value = "Monde";
//   opt.text = "Tous les pays";

//   // selector
//   var sel = document.createElement("select");
//   sel.add(opt, null);
//   sel.id = "selectButton";
//   visu.prepend(sel);
// }
