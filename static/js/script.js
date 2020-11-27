//challenge 1: Your age in days.

function ageInDays() {
    var birthYear = prompt('What year were you born?');
    var ageInDays = (2018 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you are ' + ageInDays + 'days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1); 
}

function reset() {
    document.getElementById('ageInDays').remove();
}

//challenge 2: cat generation

function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=smallest";
    div.appendChild(image)
}

//challenge 3: RPS game

function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage (results);
    rpsFrontEnd(yourChoice.id, botChoice, message);
    
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock':0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors':0},
        'scissors': {'rock': 0, 'paper': 1, 'scissors':0.5}     
     };

     var yourScore = rpsDatabase[yourChoice][computerChoice];
     var botScore = rpsDatabase[computerChoice][yourChoice];

     return [yourScore, botScore];
}

function finalMessage([yourScore, botScore]){
    if (yourScore === 0) {
        return {'message': 'you lost!', 'color': 'red'};

    } else if( yourScore === 0.5){
        return {'message': 'you tied!', 'color': 'yellow'};
    } else{
        return {'message': 'you won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div'); 
    var messageDiv = document.createElement('div');
    var botDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'   >";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'   >";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage.color + "; font-size: 60px; padding: 30px; '>" + finalMessage.message + "</h2>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
} 

//challenge4: Change the collor of all buttons.
var all_buttons = document.getElementsByTagName('button')

var copyAllButtons = [];
for (let i =0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1])
}



function buttonColorChange(buttonElement) {
    if (buttonElement.value === 'red') {
        buttonsRed();
    } else if (buttonElement.value === 'green'){
        buttonsGreen();
    }else if (buttonElement.value === 'reset'){
        buttonColorReset();
    }else if (buttonElement.value === 'random'){
        randomColors();
    }
}

function buttonsRed() {
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset () {
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}   

function randomColors() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for (let i =0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        var randomNumber = Math.floor(Math.random() *4);
        var randomChoice = choices[randomNumber];
        all_buttons[i].classList.add(randomChoice);
    }
}

//challenge 5: Blackjack

//blackjack Object
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K','A'],
    'cardsMap' : {'2' : 2, '3': 3, '4':4 , '5': 5, '6':6 , '7':7 , '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand' : false,
    'turnsOver': false,
};

/*
constants for the game
*/


//player constants
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

//sound constants
const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const lossSound = new Audio("static/sounds/aww.mp3");

//event listeners for the game buttons
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

//hit button logic
function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card , YOU);
        showScore(YOU);
    }
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
        
    }
}

function blackjackDeal (){
    if (blackjackGame['turnsOver'] === true){
    
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        yourImages.forEach(x => x.remove());
        dealerImages.forEach(x => x.remove());

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";
        blackjackGame['turnsOver'] = false;
        blackjackGame['isStand'] = false;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex]; 
}

function updateScore(card,activePlayer){
    if (card === 'A'){
    //If adding 11 keeps me below 21, add 11. Otherwise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore (activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep (ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic (){
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 17 && blackjackGame['isStand'] === true){
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    await sleep (1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
 
    
}

//compute winner and return who just won
//update the wins, draws, and losses
function computeWinner (){

    let winner;

    if (YOU['score'] <= 21){
        // condition: higherscore than dealer or when dealer bust but you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21 )){
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses']++; 
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++; 
        }
    //condition: when user busts but dealer doesn't
    }else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    //condition: when both bust.    
    } else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame)
    return winner;
}

function showResult (winner){
    let message, messageColor;

    if(blackjackGame['turnsOver']===true){
        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        }else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
}
}
