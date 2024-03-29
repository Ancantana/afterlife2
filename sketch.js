let currentStatement = 0;
let statements = [
  "welcome to the afterlife",
  "you died! please don't panic",
  "we're going to ask you a few questions",
  "to see what your version of the afterlife is",
  "let's start"
];

let currentQuestion = 0;
let questions = [
  {
    text: "on a scale from 1 - 10, how good do you think you've been in this life?",
    type: "scale"
  },
  {
    text: "do you think you've lived a fulfilling life?",
    type: "yesNo"
  },
  {
    text: "do you believe that you're righteous?",
    type: "yesNo"
  },
  {
    text: "what would you have done differently in this life?",
    type: "text"
  },
  {
    text: "what do you believe the afterlife is?",
    type: "options",
    options: ["Reincarnation", "Eternal life", "Nothing"]
  }
];

let userAnswer = "";
let slider;
let moveOnButton;
let yesOption, noOption, textInput;
let reincarnationOption, eternalLifeOption, nothingOption;
let questionColor = "#7C7C7C";
let cursorGlowSize = 10;
let backgroundAudio;

function preload() {
  backgroundAudio = new Audio('660109__matrixxx__space-atmosphere-03-remastered (1).mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  textAlign(CENTER, CENTER);
  textSize(12);
  fill(questionColor);
  drawingContext.shadowBlur = 20;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;

  backgroundAudio.loop = true;
  backgroundAudio.play();

  slider = createSlider(1, 10, 5, 1);
  slider.position(width / 2 - 100, height / 2 + 20);
  slider.style('width', '200px');
  let sliderColor = color(255, 255, 255);
  slider.style('background-color', sliderColor);
  slider.style('outline-color', sliderColor);
  slider.elt.style.setProperty('--thumb-color', 'white');
  slider.hide();

  moveOnButton = createButton("Ready to move on?");
  moveOnButton.position(width / 2 - moveOnButton.width / 2, height / 2 + 100);
  moveOnButton.mousePressed(nextQuestion);
  moveOnButton.style('background-color', 'rgba(250,9,9,0)');
  moveOnButton.style('color', questionColor);
  moveOnButton.style('border', '2px solid ' + questionColor);
  moveOnButton.style('border-radius', '24px');
  moveOnButton.style('font-family', 'CustomFont, sans-serif');
  moveOnButton.style('font-size', '12px');
  moveOnButton.style('padding', '8px 16px');
  moveOnButton.style('opacity', '0.5');
  moveOnButton.hide();

  yesOption = createDiv("Yes");
  yesOption.style('color', questionColor);
  // Remaining code for yesOption, noOption, textInput, and options for the "what do you believe the afterlife is?" question...

  // Remaining code for draw, displayQuestion, nextQuestion, and windowResized functions...
}

function draw() {
  background(0);

  if (currentStatement < statements.length) {
    fill(questionColor);
    text(statements[currentStatement], width / 2, height / 2);

    if (frameCount % 180 === 0) {
      currentStatement++;
    }
  } else {
    displayQuestion();
  }

  // Update cursorGlowSize based on the current question
  if (currentQuestion === 0) {
    cursorGlowSize = 0;
  } else if (currentQuestion === 1) {
    cursorGlowSize = 0;
  } else if (currentQuestion === 2) {
    cursorGlowSize = 0;
  } else if (currentQuestion === 3) {
    cursorGlowSize = 0;
  } else if (currentQuestion === 4) {
    cursorGlowSize = 0;
  } else if (currentQuestion === questions.length) {
    cursorGlowSize = 0;
  } else if (currentQuestion === questions.length + 1) {
    cursorGlowSize = 0;
  }

  // Draw the cursor glow
  drawingContext.shadowColor = color(217, 217, 217, 50);
  noStroke();
  fill(217, 217, 217, 50);
  ellipse(mouseX, mouseY, cursorGlowSize);
}

function displayQuestion() {
  background(0);
  fill(questionColor);

  if (currentQuestion < questions.length) {
    text(questions[currentQuestion].text, width / 2, height / 2 - 20);

    if (questions[currentQuestion].type === "scale") {
      slider.show();
      text(slider.value(), width / 2, height / 2 + 60);

      if (slider.value() !== userAnswer) {
        userAnswer = slider.value();
        moveOnButton.show();
      }
    } else if (questions[currentQuestion].type === "yesNo") {
      let optionSpacing = 60;
      let optionOffset = 10;

      yesOption.position(width / 2 - optionSpacing - optionOffset, height / 2 + 40);
      yesOption.show();
      noOption.position(width / 2 + optionSpacing - optionOffset, height / 2 + 40);
      noOption.show();
      slider.hide();
      moveOnButton.hide();
    } else if (questions[currentQuestion].type === "text") {
      textInput.position(width / 2 - textInput.width / 2, height / 2 + 28);
      textInput.show();
    } else if (questions[currentQuestion].type === "options") {
      reincarnationOption.show();
      eternalLifeOption.show();
      nothingOption.show();

      slider.hide();
      moveOnButton.hide();
      yesOption.hide();
      noOption.hide();
      textInput.hide();
    } else {
      reincarnationOption.hide();
      eternalLifeOption.hide();
      nothingOption.hide();
    }
  } else {
    // Display "let's see where you're headed" message
    text("Okay, let's see where you're headed", width / 2, height / 2 - 20);
    setTimeout(() => {
      currentStatement++;
      setTimeout(() => {
        currentStatement++;
        setTimeout(() => {
          currentStatement++;
          setTimeout(() => {
            // Change to "loading..." after 3 seconds
            currentStatement++;
          }, 3000); // 3 seconds delay before changing to "loading..."
        }, 3000); // 3 seconds delay before showing the message
      }, 3000); // 3 seconds delay before showing the message
    }, 3000); // 3 seconds delay before showing the message
  }
}

function nextQuestion() {
  if (questions[currentQuestion].type === "text" && userAnswer.trim() === "") {
    return; // Do not move on if the text input is empty
  }

  userAnswer = "";
  currentQuestion++;
  slider.value(5);
  moveOnButton.hide();
  yesOption.hide();
  noOption.hide();
  textInput.hide();
  reincarnationOption.hide();
  eternalLifeOption.hide();
  nothingOption.hide();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  slider.position(width / 2 - 100, height / 2 + 20);
  moveOnButton.position(width / 2 - moveOnButton.width / 2, height / 2 + 100);
  textInput.position(width / 2 - textInput.width / 2, height / 2 + 28);

  let optionSpacing = 120; // Adjust this value for desired spacing
  let basePosition = (width - (3 * optionSpacing)) / 2 + 40; // Move options to the right by 40 pixels

  reincarnationOption.position(basePosition, height / 2 + 40);
  eternalLifeOption.position(basePosition + optionSpacing, height / 2 + 40);
  nothingOption.position(basePosition + 2 * optionSpacing - 10, height / 2 + 40); // Move "Nothing" option a bit to the left
}

