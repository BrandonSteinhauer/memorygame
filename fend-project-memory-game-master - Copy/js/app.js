let cards = document.querySelectorAll('.card', '.match');
let moves = document.querySelector('.moves');
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let counter = 0;
let openReset = document.querySelectorAll('.open', '.match');
let deck = document.querySelectorAll('.deck');
let stars = document.querySelectorAll('.fa-star');
let resetButton = document.querySelectorAll('.restart');
let modal = document.getElementById('modal');
let modalBackground = document.getElementById('modal-background');
let playBtn = document.getElementById('play-again');
let closeBtn = document.getElementById('close');
let matches = 0;
let second = 0, minute = 0;
let modalTime = document.getElementById("htmlTime");
let modalStars = document.getElementById("htmlMoves");
let timer = document.querySelector(".timer");
let interval;
let starsCounter = 3;
playBtn.addEventListener('click', playAgain);
closeBtn.addEventListener('click', modalClose);
cards.forEach(card => card.addEventListener('click', open))
resetButton.forEach(resetButton => resetButton.addEventListener('click', resetGame));
shuffle(cards);

//shuffles
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};

function playAgain() {
  modalClose();
  resetGame();
}

//flips the card
function open() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('open');
  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    check();
  }
}

//unflips the card
function close() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('open');
    secondCard.classList.remove('open');
    resetCard();
    add();
    countTheMoves();
    lockBoard = false;
  }, 1000);
}

//removes cards from play if it's a match
function lock() {
  firstCard.removeEventListener('click', open);
  secondCard.removeEventListener('click', open);
  add();
  countTheMoves();
  match();
}

//stops a double click bug
function resetCard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard]= [null, null];
}

//compares the cards
function check() {
  if(firstCard.dataset.choice === secondCard.dataset.choice) {
    lock();
  } else {
  close();
  }
}

//adds to the counter when two clicks have been made
function add() {
  counter += 1;
  return counter;
}


//counters the moves and collapses the stars as the counter increases
function countTheMoves() {
  moves.innerText = counter;
  timerTick();
  if (counter > 8 && counter < 12){
    modalStars.innerHTML = starsCounter = 2;
    for( i= 0; i < 3; i++){
        if(i > 1){
            stars[i].style.visibility = "collapse";
        }
    }
  }
  else if (counter > 18){
    modalStars.innerHTML = starsCounter = 1;
    for( i= 0; i < 3; i++){
        if(i > 0){
            stars[i].style.visibility = "collapse";
        }
    }
  }
  else if (counter === 0) {
    for( i = 0; i < 3; i++) {
      stars[i].style.visibility = "visible";
    }
  }
}

//matches and adds appropriate classes
function match() {
  matches += 1;
  firstCard.classList.add('match');
  secondCard.classList.add('match');
  firstCard.classList.remove("show", "open");
  secondCard.classList.remove("show", "open");
  resetCard();
  if (matches === 8) {
    modalOpen();
    stopTimer();
  }
}

//opens modal
function modalOpen() {
  modalBackground.classList.add('open');
  modal.classList.add('open');
}

//closes modal
function modalClose () {
  modalBackground.classList.remove('open');
  modal.classList.remove('open');
}

//timer
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"m "+second+"s";
        modalTime.innerHTML = minute+"m "+second+"s";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//stops the timer
function stopTimer() {
  clearInterval(interval);
}
//having trouble getting everything to reset back to zero, going to touch back on this later
//and use a reload page method for now
function resetGame() {
  /* modalClose();
  matches = 0;
  second = 0;
  minute = 0;
  moves.innerText = counter = 0;
  for (i = 0; i < cards.length; i++){
    cards[i].classList.remove('open', 'match');
    cards[i].addEventListener('click', open);
  } */
  window.location.reload(false);
}

//starts timer after first click count
function timerTick() {
  if (counter == 1) {
  startTimer();
  }
}
