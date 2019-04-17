// Create a list that holds all of your cards
const cards = ['fa-anchor','fa-anchor',
               'fa-bicycle','fa-bicycle',
               'fa-bolt', 'fa-bolt',
               'fa-bomb', 'fa-bomb',
               'fa-cube', 'fa-cube',
               'fa-diamond', 'fa-diamond',
               'fa-leaf', 'fa-leaf',
               'fa-paper-plane-o', 'fa-paper-plane-o',
              ];

/* Display the cards on the page */
//   - shuffle the list of cards using the provided "shuffle" method below  // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let shuffledCards = [];
function shuffleCards() {
    shuffledCards = shuffle(cards); // check with console.log(shuffledCards);
};

function initGame() {
    shuffleCards();
//   - loop through each card and create its HTML
    let generatedCardHTML = shuffledCards.map(x => '<li class="card" data-card="' + x + '"><i class="fa ' + x + '"></i></li>'); // console.log(generatedCardHTML);
//   - add each card's HTML to the page
    let deck = document.querySelector('.deck');
    deck.innerHTML = generatedCardHTML.join('');
}
initGame();

let card = '';
let allCards = document.querySelectorAll('.card');
let openCards = [];
let moveCounter = document.querySelector('.moves');
let numberOfMoves = 0;
let matchedPairs = 0;
let minutes = document.querySelector('.minutes');
let min = 00;
let minPad = minutes.textContent;
let seconds = document.querySelector('.seconds');
let sec = 00;
let secPad = seconds.textContent;
let timerStarted = false;
let timer = '';
let resetButton = document.querySelector('.fa-repeat');
const starArea = document.querySelector('.stars');
let starChild = starArea.firstElementChild;
let starRating = '';

resetButton.addEventListener('click', function(event) {
    reset();
});

allCards.forEach(function(card) {
//  set up the event listener for a card. If a card is clicked:
    card.addEventListener('click', function(event) {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
//  - display the card's symbol (put this functionality in another function that you call from this one)
//  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
            if (timerStarted == false) {
                timeMechanic();
            }
            faceUp(card);
            openCardList(card);
//  - if the list already has another card, check to see if the two cards match
            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
//    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
                    matchYes(openCards);
                    matchedPairs++;
                } else {
//    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
                    matchNo(openCards);
                }
                openCards = [];
//    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
                numberOfMoves++;
                updateMoves();
                removeStar();
                starRating = starArea.childElementCount;
            }
        }
//    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
        if (matchedPairs == 8) {
            displayWin(); 
        }
    });
});


function faceUp(card) {
    card.classList.add('open', 'show');
}

function openCardList(card) {
    openCards.push(card);
}

function matchYes(openCards) {
        openCards[0].classList.add('match');
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.add('match');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
}

function matchNo(openCards) {
    setTimeout(function() {
        openCards.forEach(function(card) {
            card.classList.remove('open', 'show');
        });
    }, 1000);
}

function updateMoves() {
    moveCounter.textContent = numberOfMoves;
}

function displayWin() {
    if (window.confirm('You won! Rating: ' + starRating + ' stars. Total Time: ' + minPad + ':' + secPad + '  Play again?')) {
       reset();
    } else {
       clearInterval(timer);
    }
}

function timeMechanic() {
    timer = setInterval(function() {
        sec++;
        if (sec > 59) {
            sec = 00;
            min++;
            if (min < 10) {
                minutes.textContent = '0' + min;
            } else {
                minues.textContent = min;
            }
            minPad = minutes.textContent;
        }
            if (sec < 10) {
                seconds.textContent = '0' + sec;
            } else {
                seconds.textContent = sec;
            }
            secPad = seconds.textContent;

    }, 1000);
    timerStarted = true;
}

function reset() {
    location.reload(true);
}

function removeStar() {
    starChild = starArea.firstElementChild;
    if ((numberOfMoves == 13) || (numberOfMoves == 17)) {
        starArea.removeChild(starChild);
    }
}
