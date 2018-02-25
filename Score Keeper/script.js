const p1btn = document.querySelector("#p1");
const p2btn = document.querySelector("#p2");
const reset = document.querySelector('#reset');
const p1Score = document.getElementById('p1-score');
const p2Score = document.getElementById('p2-score');
const limit = document.getElementById('limit');
const input = document.querySelector('input');

let gameOver = false;
let winScore = limit.textContent;

p1btn.addEventListener("click", ()=>{
  if(!gameOver){
    p1Score.textContent= Number(p1Score.textContent)+1;
  }
  if (p1Score.textContent === winScore) {
    gameOver = true;
    p1Score.classList.add('winner')
  }
});

p2btn.addEventListener("click", ()=>{
  if(!gameOver){
    p2Score.textContent= Number(p2Score.textContent)+1;
  }
  if (p2Score.textContent === winScore) {
    gameOver = true;
    p2Score.classList.add("winner");
    
  }
});

reset.addEventListener("click", ()=>{
  p1Score.textContent=p2Score.textContent=0;
  p2Score.classList.remove("winner");
  p1Score.classList.remove("winner");
  gameOver = false;
});

input.addEventListener('change',()=>{
  limit.textContent = winScore = input.value;
})