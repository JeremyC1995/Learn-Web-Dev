const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay")
const message = document.querySelector("#message");
const h1 = document.querySelector('h1');
const resetBtn = document.querySelector("#reset");
const modeBtn = document.querySelectorAll(".mode");
let numOfSquare = 6;
let colors = [];
let pickedColor;

init();

function init(){
  setupModeBtn();
  setupSquares();
  resetBtn.addEventListener("click", ()=>{
    reset();
  });
  reset();
}



function setupModeBtn(){
  // mode btn add Event
  for(let i = 0; i <modeBtn.length; i++){
    modeBtn[i].addEventListener("click", function(){
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      modeBtn[2].classList.remove("selected");
      this.classList.add("selected");
      numOfSquare=this.value;
      reset();
    });  
  }
}
function setupSquares(){
  // add EventListener to squares
  squares.forEach((x,i)=>{
    x.addEventListener("click",()=>{
      if(x.style.backgroundColor===pickedColor){
        message.textContent = "Correct!"
        squares.forEach(x=>{
          x.style.backgroundColor=pickedColor;
        });
        h1.style.backgroundColor=pickedColor;
        resetBtn.textContent = "Play Again?";
      } else {
        x.style.backgroundColor = "#232323";
        message.textContent = "Try Again";
        resetBtn.textContent = "New Color";
      }
    });
  });
}

function reset(){
  message.textContent = "";
  colors = generateRamdomColors(numOfSquare);
  pickedColor = pickColor();
  colorDisplay.textContent= pickedColor;
  squares.forEach((x,i)=>{
    x.style.backgroundColor = colors[i];
  });
  resetBtn.textContent = "New Color";
  squares.forEach((c,i)=>{
    if(colors[i]){
      c.style.display="block";      
      c.style.backgroundColor=colors[i];
    } else {
      c.style.display="none";
    }
  });
  h1.style.backgroundColor="steelblue";
}

function pickColor(){
  const random = Math.floor(Math.random()*colors.length);
  return colors[random];
}

function generateRamdomColors(num){
  let arr=[];
  for(let i = 0; i<num; i++){
    arr.push(ramdomColor());
  }
  return arr;
}

function ramdomColor(){
  // rgb color
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  return `rgb(${r}, ${g}, ${b})`;
}