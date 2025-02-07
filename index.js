
const questions = [ {
  question: 'What type of damage does the ability Finger of Death from Lion deal?', 
  answers: [
  { text: 'Pure', correct: false },
  { text: 'Magical', correct: true },
  { text: 'Mixed', correct: false },
  { text: 'Physical', correct: false },
           ] 
},
{ question: 'Which one of these Heroes is Universal?', 
  answers: [
  { text: 'Batrider', correct:true  },
  { text: 'Clinkz', correct: false },
  { text: 'Morphling', correct: false },
  { text: 'Viper', correct: false },
           ] 
}, {
  question: 'Whos the Heaviest Hero in Dota 2?', 
  answers: [
  { text: 'Pudge', correct: false },
  { text: 'TideHunter', correct: false },
  { text: 'Tiny', correct: true },
  { text: 'Your momma', correct: false },
           ] 
},
{ question: 'Discluding medusa, What Hero has the least HP at level 25?', 
  answers: [
  { text: 'Enchantres', correct:true  },
  { text: 'Clinkz', correct: false },
  { text: 'Keeper Of The Light', correct: false },
  { text: 'Morphing', correct: false },
           ] 
},
{
  question: 'Zharvakko is the name of which hero, also known for placing wards and stunning foes?', 
  answers: [
  { text: 'Witch Doctor', correct: true },
  { text: 'Naga Siren', correct: false },
  { text: 'Warlock', correct: false },
  { text: 'Mars', correct: false },
           ] 
}, {
  question: 'Which Intelligence-based heroes Hex spell can transform a foe into a chicken?', 
  answers: [
  { text: 'Shadow Shaman', correct: true },
  { text: 'Lion', correct: false },
  { text: 'Rubick', correct: false },
  { text: 'Chikaloo', correct: false },
           ] 
}, 

{
  question: 'What ranged heroes ability to assassinate a foe can take out a damaged enemy hero with one well-placed shot?', 
  answers: [
  { text: 'Sniper', correct: false },
  { text: 'Mars', correct: false },
  { text: 'Drow Ranger', correct: false },
  { text: 'Windranger', correct: true },
           ] 
}];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-btns');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomnum = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomnum]] = [array[randomnum], array[i]];
  }
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffleArray(questions)
  nextButton.innerHTML = 'Next';
  nextButton.style.display = 'none';
  showQuestion();

  const existingRankImage = document.getElementById('rank-image');
  if (existingRankImage) {
    existingRankImage.remove();
  }
}

function showQuestion() {
    resetState();
  let currentQuestion = questions[currentQuestionIndex]
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;
  
  shuffleArray(currentQuestion.answers);

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if(answer.correct) {
         button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
  })
}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
const selectedBtn = e.target;
const isCorrect = selectedBtn.dataset.correct === 'true';
if(isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
}
else {
     selectedBtn.classList.add('incorrect');
     const message = document.createElement('p');
        message.innerHTML = 'herald ass nigga';
        message.style.color = 'red';
        message.style.fontWeight = 'bold';
        message.style.marginTop = '10px';
        answerButtons.appendChild(message);
    
}
Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true') {
        button.classList.add('correct')
    }

    button.disabled = true;
});
nextButton.style.display = 'block';

}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';

    const rankImage = document.createElement('img');
    rankImage.style.display = 'block';
    rankImage.style.margin = '20px auto';
    rankImage.style.width = '500px';

    if (score <= 2) {
        rankImage.src = 'imgs/guardian.png';
    } else if (score <= 4) {
        rankImage.src = 'imgs/archon.png';
    } else if (score <= 6) {
        rankImage.src = 'imgs/ancient.png';
    } else {
        rankImage.src = 'imgs/immortal.png';
    }

    document.body.appendChild(rankImage);
}

function handleNextButton() {

currentQuestionIndex++;
if(currentQuestionIndex < questions.length) {
showQuestion();
}
else {
showScore();
}

}
nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();

    }

});

startQuiz();

