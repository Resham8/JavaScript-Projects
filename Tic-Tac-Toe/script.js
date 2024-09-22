let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
 
const WinPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    EnabledBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = "#00A6ED"; 
            turnO = false;            
        } else {
            box.innerText = "X";
            box.style.color = "#F6511D"; 
            turnO = true;
        }
        checkWinners();
        box.disabled = true;
    });
});


const DisabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
        box.innerText = ""; 
        box.style.backgroundColor = "";         
    }
};


const EnabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    setTimeout(() => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");        
        DisabledBoxes();
        makeItRain();
    }, 1000); 
}


const checkWinners = () => {
    for(let pattern of WinPatterns){        
        let pos1val = boxes[pattern[0]].innerText
        let pos2val = boxes[pattern[1]].innerText
        let pos3val = boxes[pattern[2]].innerText

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                boxes[pattern[0]].style.backgroundColor = "#7fff69";
                boxes[pattern[1]].style.backgroundColor = "#7fff69";
                boxes[pattern[2]].style.backgroundColor = "#7fff69";
                showWinner(pos1val);
                return;
            }
        }
    }

    // Arr.form creates a proper array, .every checks if all of the boxes are not empty
    const allFilled = Array.from(boxes).every(box => box.innerText !== "");

    if(allFilled){
        setTimeout(() => {
            msg.innerText = "It's a Tie!";
            msgContainer.classList.remove("hide");
            DisabledBoxes();
        }, 1000);
    }
}

function makeItRain() {    
  var end = Date.now() + (2 * 1000);
  
  var colors = ['#bb0000', '#ffffff'];
  
  function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });
  
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
    frame();
  }

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
