const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');

const scoreParagraph = document.getElementById('score');
const resultParagraph = document.getElementById('result');
const movesParagraph = document.getElementById('moves');

let computerMove = '';

rockBtn.innerHTML = '<img src="./images/rock.png">';
paperBtn.innerHTML = '<img src="./images/paper.png">';
scissorsBtn.innerHTML = '<img src="./images/scissors.png">';

rockBtn.addEventListener('click', () => {
   playGame('rock');
});

paperBtn.addEventListener('click', () => {
   playGame('paper');
});

scissorsBtn.addEventListener('click', () => {
   playGame('scissors');
});

const score = JSON.parse(localStorage.getItem('score')) || {
   wins: 0,
   losses: 0,
   ties: 0
};

resetBtn.addEventListener('click', () => {
   score.wins = 0;
   score.losses = 0;
   score.ties = 0;
   localStorage.removeItem('score');
   updateScoreElement();
});

function playGame(playerMove) {
   pickComputerMove();
   let result = ''; 

   if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
         result = 'You lose.';
      }
      else if (computerMove === 'paper') {
         result = 'You win.';
      }
      else {
         result = 'Tie.';
      }
   }
   else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
         result = 'You win.';
      }
      else if (computerMove === 'paper') {
         result = 'Tie.';
      }
      else {
         result = 'You lose.';
      }
   }
   else {
      if (computerMove === 'rock') {
         result = 'Tie.';
      }
      else if (computerMove === 'paper') {
         result = 'You lose.';
      }
      else if (computerMove === 'scissors') {
         result = 'You win.';
      }
   }

   if (result === 'You win.') {
      score.wins += 1;
   }
   else if (result === 'You lose.') {
      score.losses += 1;
   }
   else if (result === 'Tie.') {
      score.ties += 1;
   }

   localStorage.setItem('score', JSON.stringify(score)); 

   updateScoreElement();

   resultParagraph.innerHTML = result;
   movesParagraph.innerHTML = `You ${playerMove} - Computer ${computerMove}`;
}

function updateScoreElement() {
   scoreParagraph.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
   const randomNumber =  Math.random();

   if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';
   }
   else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove = 'paper';
   }
   else {
      computerMove = 'scissors';
   }
}