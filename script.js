const words = ["gift", "power", "dark", "storm", "game", "type", "level", "random", "speed", "focus"];
let currentWord = "";
let score = 0;
let level = 1;
let time = 10;
let timer;
let isPlaying = false;

const wordDisplay = document.getElementById("word");
const input = document.getElementById("input");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const timeDisplay = document.getElementById("time");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

function pickWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.innerHTML = currentWord.split("").map(letter => `<span>${letter}</span>`).join("");
  input.value = "";
  time = 10 - (level - 1); // less time for higher levels
  timeDisplay.textContent = time;
}

function startGame() {
  isPlaying = true;
  score = 0;
  level = 1;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  pickWord();
  message.textContent = "";
  clearInterval(timer);
  timer = setInterval(countDown, 1000);
}

function countDown() {
  if (time > 0) {
    time--;
    timeDisplay.textContent = time;
  } else {
    gameOver();
  }
}

function gameOver() {
  isPlaying = false;
  message.textContent = "💀 Game Over!";
  clearInterval(timer);
}

input.addEventListener("input", () => {
  if (!isPlaying) return;

  let letters = wordDisplay.querySelectorAll("span");
  let typed = input.value;

  letters.forEach((letter, index) => {
    if (typed[index] === letter.textContent) {
      letter.style.color = "#22c55e";
    } else {
      letter.style.color = "#e6edf3";
    }
  });

  if (typed === currentWord) {
    score++;
    scoreDisplay.textContent = score;

    if (score % 5 === 0) {
      level++;
      levelDisplay.textContent = level;
    }

    pickWord();
  }
});

startBtn.addEventListener("click", startGame);
