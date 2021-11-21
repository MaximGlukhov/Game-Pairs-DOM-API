(() => {
  const cards = document.querySelectorAll('.card');
  const btnRestartGame = document.querySelector('.btn__restart-game');
  const btnStartGame = document.querySelector('.start-game__btn');
  const numberCards = document.querySelector('.start-game__number-cards__input');
  const dispTimer = document.querySelector('.display-timer');
  let timer;
  let seconds;


  let hasFlippedCard = false;
  let firstCard, secondCard;
  let lockBoard = false;

  function countSec() {
    if(seconds === 0) {
      clearInterval(timer);
      cards.forEach(card => card.classList.remove('rotate'));
      cards.forEach(card => card.removeEventListener('click', flipCard));
    }
    dispTimer.textContent = seconds--;
  }

  function startTimer() {
    clearInterval(timer);
    seconds = 120;
    timer = setInterval(countSec, 1000);
  }

  function flipCard() {
    if (lockBoard == true) {
      return
    }
    this.classList.add('rotate');
    if (hasFlippedCard == false) {
      hasFlippedCard = true;
      firstCard = this;
      return
    }
    secondCard = this;
    hasFlippedCard = false;

    backFlipCard();

    if (document.querySelectorAll('.card').length == document.querySelectorAll('.card.rotate').length) {
      btnRestartGame.classList.add('btn-active');
      document.querySelectorAll('.card.rotate').forEach(c => c.classList.remove('rotate'));
    }

  }

  function backFlipCard() {
    lockBoard = true;
    if (firstCard.dataset.card !== secondCard.dataset.card) {
      setTimeout(() => {
        firstCard.classList.remove('rotate');
        secondCard.classList.remove('rotate');
        resetCards();
      }, 1000);
    }
    else {
      disableCards();
      resetCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }


  function resetCards() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
      temp.style.order = i;
    }
    return arr;
  }

  btnStartGame.addEventListener('click', function (e) {
    e.preventDefault()
    cards.forEach(card => card.addEventListener('click', flipCard));
    cards.forEach(card => card.classList.remove('rotate'));
    btnRestartGame.classList.remove('btn-active');
    shuffle(cards);
  });

  btnStartGame.addEventListener('click', startTimer);

  btnRestartGame.addEventListener('click', startTimer);
  btnRestartGame.addEventListener('click', () => {
    cards.forEach(card => card.addEventListener('click', flipCard));
    cards.forEach(card => card.classList.remove('rotate'));
    cards.forEach(card => card.classList.remove('active'));
    shuffle(cards);    
  })
  btnRestartGame.addEventListener('click', ()=> {
    btnRestartGame.classList.remove('btn-active');
  });


})();
