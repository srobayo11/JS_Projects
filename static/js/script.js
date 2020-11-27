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

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K','A'],
    'cardsMap' : {'2' : 2, '3': 3, '4':4 , '5': 5, '6':6 , '7':7 , '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A':[1,11]},
};


const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio("static/sounds/swish.m4a");

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card , YOU);
    showScore(YOU)
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
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    yourImages.forEach(x => x.remove());
    dealerImages.forEach(x => x.remove());

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