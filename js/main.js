var questions = [
  {
    question:
      "Vous avez certainement déjà entendu dire que notre consommation de viande est problématique, mais avez-vous une idée de l’écart entre l’empreinte carbone des produits d’origine animale et celle des produits d’origine non animale ?",
    answers: {
      a: "4 fois plus élevé",
      b: "7 fois plus élevé",
      c: "17 fois plus élevé"
    },
    correctAnswer: "c",
    explication: ""
  },
  {
    question:
      "Produire de la nourriture nécessite des ressource et n’est pas sans conséquence sur le plan écologique, comme nous venons de le voir avec la visualisation précédente. D’après vous, quelle proportion des aliments produits pour la consommation humaine est perdue ou gaspillée à l’échelle mondiale chaque année ?",
    answers: {
      a: "1/4",
      b: "1/3",
      c: "1/2"
    },
    correctAnswer: "b",
    explication: ""
  },
  {
    question:
      "Si vous avez jeté un coup d'oeil à la visualisation précédente, vous aurez compris qu'en tant que consommateur vous avez le pouvoir d'éviter  certaines de ces pertes alimentaire. Voulez-vous en savoir plus ?",
    answers: {
      a: "Oui",
      b: "Oui bien sûr",
      c: "Absolument"
    },
    correctAnswer: "a",
    explication: ""
  },
  {
    question:
      "Entre 1990 et 2018, l'utilisation de pesticides dans le monde a augmenté de :",
    answers: {
      a: "20%",
      b: "45%",
      c: "70%"
    },
    correctAnswer: "c",
    explication: ""
  }
];
var zoneQuizz = document.getElementById("app__question");
var zoneExpl = document.getElementById("app__explication");
var zoneExplication = document.getElementById("resultats");
var boutonReponse = document.getElementById("submit");
var boutonSuivant = document.getElementById("suivant");
var boutonRecommencer = document.getElementById("recommencer");
var liste_visu = [];
var numQuestion = 0;
var nombreBonnesReponses = 0;
function showQuestions(
  questions,
  quizContainer,
  boutonReponse,
  boutonSuivant,
  i
) {
  if (boutonReponse) {
    boutonReponse.hidden = false;
    boutonSuivant.hidden = true;
  }
  var output = [];
  var answers;
  // first reset the list of answers
  answers = [];
  var letter;
  // for each available answer to this question...
  for (letter in questions[i].answers) {
    answers.push(
      '<li data-value="' +
        letter +
        '">' +
        questions[i].answers[letter] +
        "</li>"
    );
  }
  // add this question and its answers to the output
  output.push(
    '<h3 class="question--counter">Question ' +
      (i + 1) +
      "</h3>" +
      '<h2 class="question--query">' +
      questions[i].question +
      "</h2>" +
      '<ol class="question--answers">' +
      answers.join("") +
      "</ol>"
  );
  // finally combine our output list into one string of html and put it on the page
  if (quizContainer) quizContainer.innerHTML = output;
  //////////////////////////////////////////
  setClickEvent();
}
function showResults(
  questions,
  quizContainer,
  resultsContainer,
  explicationContainer,
  i
) {
  // gather answer containers from our quiz
  var answerContainers = quizContainer.querySelectorAll(".question--answers");
  // keep track of user's answers
  var userAnswer = "";
  ///////////////////////////////////////////////////////////////////////
  // selected answer
  var userAnswerSelector =
    answerContainers[0].querySelector(".selected") || null;
  if (userAnswerSelector)
    userAnswer = userAnswerSelector.getAttribute("data-value");
  if (
    userAnswer === questions[i].correctAnswer ||
    (i === 2 && userAnswerSelector)
  ) {
    nombreBonnesReponses++;
    userAnswerSelector.classList.add("correct");
  }
  // if answer is wrong or blank
  else {
    var correctAnswer = answerContainers[0].querySelector(
      '[data-value="' + questions[i].correctAnswer + '"]'
    );
    correctAnswer.classList.add("correct");
    if (userAnswerSelector) userAnswerSelector.classList.add("wrong");
  }
  // affiche le nombre de bonnes réponses
  explicationContainer.innerHTML = questions[i].explication;
  resultsContainer.hidden = false;
  explicationContainer.hidden = false;
  if (i === 3) {
    setTimeout(function () {
      alert("Cliquez sur la visualisation pour la faire évoluer");
    }, 5000);
  }
}
// affiche une question
showQuestions(questions, zoneQuizz, boutonReponse, boutonSuivant, 0);
boutonReponse.onclick = function () {
  liste_visu[numQuestion].hidden = false;
  boutonReponse.hidden = true;
  boutonSuivant.hidden = false;
  showResults(questions, zoneQuizz, zoneExplication, zoneExpl, numQuestion);
};
boutonSuivant.onclick = function () {
  liste_visu[numQuestion].hidden = true;
  boutonReponse.hidden = true;
  boutonSuivant.hidden = false;
  zoneExplication.hidden = true;
  zoneExpl.hidden = true;
  numQuestion = numQuestion + 1;
  if (numQuestion < questions.length) {
    showQuestions(
      questions,
      zoneQuizz,
      boutonReponse,
      boutonSuivant,
      numQuestion
    );
  } else {
    boutonSuivant.hidden = true;
    boutonRecommencer.hidden = false;
    var output =
      '<h3 class="question--counter"> <b> Vos résultats ! </b> </h3><h2 class="question--query">' +
      "<b>" +
      "Vous avez eu " +
      nombreBonnesReponses +
      " bonne(s) réponse(s) sur " +
      numQuestion +
      "</b>"+
      "</br>";
    if (nombreBonnesReponses === 4) {
      output =
        output + "</br>" +
        "Vous aviez déjà bien conscience des enjeux de l'alimentation dans l'écologie, bravo !";
    } else if (nombreBonnesReponses === 3) {
      output =
        output + "</br>" +
        "Vous aviez déjà des connaissances sur le sujet, et maintenant vous êtes incollable !";
    } else {
      output =
        output + "</br>" +
        "Vous avez probablement appris des choses avec ce quizz, on espère que cela vous sera utile !";
    }
    output =
      output +
      '<p align="justify">' +
      "</br></br></br> En r&eacutesum&eacute : </br></br> L'Organisation des Nations Unis avertit : si la population mondiale atteint les 9,6 milliards d'individus d'ici 2050, l'&eacutequivalent de pr&egraves de trois plan&egravetes pourrait &ecirctre n&eacutecessaire afin de fournir les ressources n&eacutecessaires pour maintenir nos modes de vie actuels." +
      "</br> Bien que la plupart des incidences de notre alimentation sur l'environnement se produisent lors de la phase de production (agriculture ou transformation des aliments) (visualisations 1, 3 et 4), les m&eacutenages influencent &eacutegalement ces effets &agrave travers leurs choix et leurs habitudes alimentaires (visualisations 1, 2 et 3). Bas&eacutes sur un sch&eacutema qui &eacutepuise nos ressources naturelles d'un c&ocirct&eacute et accumule massivement les d&eacutechets de l'autre, nos modes de production et de consommation ne sont pas viables. L’&eacutevolution des comportements de consommation et de production constitue donc un levier essentiel pour r&eacuteduire notre empreinte carbone." +
      "</br></br> Voici quelques conseils &agrave la port&eacutee de tous pour agir collectivement :" +
      "<ul>" +
      "<li>" +
      "Mangez moins de produits animaux" +
      "</li>" +
      "</br></br>" +
      "<li>" +
      "Mangez local MAIS AVANT TOUT de saison, puisque l'aspect le plus probl&eacutematique &eacutecologiquement parlant est la façon de produire, devant les transports. Qu'ils soient produits localement localement sous serre ou import&eacutes de r&eacutegion lointaines, les l&eacutegumes et fruits d'&eacutet&eacute consomm&eacutes l'hiver ont un lours bilan carbone" +
      "</li>" +
      "</br></br>" +
      "<li>" +
      "Privil&eacutegiez les fili&egraveres directes, les march&eacute et les commerces de proximit&eacutes" +
      "</li>" +
      "</br></br>" +
      "<li>" +
      "N'achetez que ce dont vous avez besoin, r&eacuteutilisez les restes ou donnez-les" +
      "</li>" +
      "</br></br>" +
      "<li>" +
      "Faites un peu de place pour les fa&ccedilons de produire alternatives, bien qu'aucune solution ne soit id&eacuteale pour l'instant" +
      "</li>" +
      "</ul>" +
      "</p>" +
      "</h2>";
    zoneQuizz.innerHTML = output;
  }
};
boutonRecommencer.onclick = function () {
  window.location.reload();
};
liste_visu.push(document.getElementById("visu1"));
liste_visu.push(document.getElementById("visu2"));
liste_visu.push(document.getElementById("visu2_2"));
liste_visu.push(document.getElementById("visu3"));
function setClickEvent() {
  // Add click event on answers items
  const answers = document.querySelectorAll(".question--answers li");
  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", (event) => {
      // Remove selected class from all options
      for (let j = 0; j < answers.length; j++) {
        answers[j].classList.remove("selected");
      }
      // add selected class only for chosen option
      answers[i].classList.add("selected");
    });
  }
}
