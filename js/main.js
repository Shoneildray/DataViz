var questions = [
  {
    question:
      "Avez-vous une idée de l’écart entre l’empreinte carbone des produits d’origine animale et celle des produits d’origine non animale ?",

    answers: {
      a: "4 fois plus élevé",
      b: "7 fois plus élevé",
      c: "13 fois plus élevé"
    },
    correctAnswer: "c",
    explication: "Contexte question 1"
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
    explication: "Contexte question 2"
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
    explication: "Contexte question 3"
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
    explication: "Contexte question 4"
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
//var nombreBonnesReponses = 0;

function showQuestions(
  questions,
  quizContainer,
  boutonReponse,
  boutonSuivant,
  i
) {
  // we'll need a place to store the output and the answer choices
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
  if (quizContainer) quizContainer.innerHTML = output.join("");
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
  // find selected answer
  //////////////////////////////////////////////////////
  // userAnswer = (
  //   answerContainers[0].querySelector(
  //     "input[name=question" + i + "]:checked"
  //   ) || {}
  // ).value;
  ///////////////////////////////////////////////////////

  if (userAnswerSelector)
    userAnswer = userAnswerSelector.getAttribute("data-value");

  if (userAnswer === questions[i].correctAnswer) {
    //nombreBonnesReponses++;
    /////////////////////////////////////////////////////
    //answerContainers[0].style.color = "lightgreen";
    userAnswerSelector.classList.add("correct");
  }
  // if answer is wrong or blank
  else {
    /////////////////////////////////////////////////////
    //answerContainers[0].style.color = "red";
    var correctAnswer = answerContainers[0].querySelector(
      '[data-value="' + questions[i].correctAnswer + '"]'
    );
    correctAnswer.classList.add("correct");
    if (userAnswerSelector) userAnswerSelector.classList.add("wrong");
  }

  // affiche le nombre de bonnes réponses
  explicationContainer.innerHTML = questions[i].explication; //nombreBonnesReponses + " sur " + (i + 1);
  resultsContainer.hidden = false;
  explicationContainer.hidden = false;

  if (i === 3) {
    setTimeout(function () {
      alert("Cliquez sur la visualisation pour la faire évoluer");
    }, 5000);
  }
  //////////////////////////////////////////////////////////////
  // au cas ou on veut mettre les commentaires du graphe dans les json
  // var explication = resultsContainer.querySelector(".answer--detail");
  // explication.innerHTML = questions[i].explication;
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
