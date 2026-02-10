const quoteTextElement = "random-quote-text";
const quoteAuthorElement = "random-quote-author";
const randomQuoteGeneratorElement = "random-quote-generator";

const colors = [
    ["#0c7dee","#db9d9d"],["#e6e677","#773a51"],["#3e1010","#3c08fa"],
    ["#bf54bd","#12a8d1"],["#0f5003","#f8d800"],["#5a0972","#1752aa"],
    ["#3d0303","#08d0c3"],["#31c93e","#abd124"],["#111921","#193426"],
    ["#d08011","#bbbb18"]
];

function getRandomColorCombo() {
    return colors[Math.floor(Math.random() * colors.length)];
}

async function getNewRandomQuote() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        if (!res.ok) throw new Error();
        const data = await res.json();
        document.getElementById(quoteTextElement).textContent = `"${data.content}"`;
        document.getElementById(quoteAuthorElement).textContent = data.author;

        const [c1, c2] = getRandomColorCombo();
        document.getElementById(randomQuoteGeneratorElement).style.background = 
            `linear-gradient(45deg, ${c1}, ${c2})`;
    } catch {
        document.getElementById(quoteTextElement).textContent = "Couldn't load quote... 😔";
        document.getElementById(quoteAuthorElement).textContent = "";
    }
}

document.getElementById("new-quote-btn").addEventListener("click", getNewRandomQuote);

// CRAPS GAME CODE


let username = '';
let balance = 1000;
let currentBet = 100;
let betType = null;
let point = null;
let round = 0;
let canBet = true;

const die1 = document.getElementById('die1');
const die2 = document.getElementById('die2');
const resultEl = document.getElementById('result');
const balanceEl = document.getElementById('balance');
const roundEl = document.getElementById('round');
const phaseEl = document.getElementById('phase');
const betAmountEl = document.getElementById('betAmount');
const totalEl = document.getElementById('total-roll');
const rollBtn = document.getElementById('rollBtn');
const passBtn = document.getElementById('passBtn');
const dontBtn = document.getElementById('dontBtn');
const playerNameEl = document.getElementById('playerName');

function startGame() {
    username = document.getElementById('username').value || 'Player';
    playerNameEl.textContent = username;
    document.getElementById('username-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    resetRound();
}

function changeBet(val) {
    currentBet = Math.max(10, Math.min(balance, currentBet + val));
    betAmountEl.textContent = currentBet;
}

function maxBet() {
    currentBet = balance;
    betAmountEl.textContent = currentBet;
}

function placeBet(type) {
    if (!canBet || currentBet > balance) return;
    betType = type;
    balance -= currentBet;
    balanceEl.textContent = balance;
    canBet = false;
    rollBtn.disabled = false;
    resultEl.textContent = `Bet $${currentBet} on ${type.toUpperCase()}`;
}

function rollDice() {
    die1.classList.add('rolling');
    die2.classList.add('rolling');

    let anim = setInterval(() => {
        die1.textContent = Math.ceil(Math.random()*6);
        die2.textContent = Math.ceil(Math.random()*6);
    },100);

    setTimeout(() => {
        clearInterval(anim);
        die1.classList.remove('rolling');
        die2.classList.remove('rolling');

        const d1 = Math.ceil(Math.random()*6);
        const d2 = Math.ceil(Math.random()*6);
        const total = d1 + d2;

        die1.textContent = d1;
        die2.textContent = d2;
        totalEl.textContent = `Total: ${total}`;

        round++;
        roundEl.textContent = round;

        let msg = `${d1} + ${d2} = ${total}`;
        let cls = '';

        if (total === 7 || total === 11) {
            balance += currentBet * 2;
            cls = 'win';
            msg += ' → YOU WIN!';
            resetRound();
        } else if ([2,3,12].includes(total)) {
            cls = 'loss';
            msg += ' → YOU LOSE!';
            resetRound();
        } else {
            msg += ' → Roll again!';
            rollBtn.disabled = false;
        }

        resultEl.textContent = msg;
        resultEl.className = `result ${cls}`;
        balanceEl.textContent = balance;

    }, 900);
}

function resetRound() {
    betType = null;
    canBet = true;
    rollBtn.disabled = true;
    phaseEl.textContent = 'Come Out Roll';
}
