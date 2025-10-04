let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // 2 player : playerX and player0 if turn0 is true than turn goes to player0 else to playerX
let count = 0; //To Track Draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
];
const resetGame = ()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const enableBoxes =()=>{
    for(let box of  boxes){
        box.disabled = false;  // enable all  boxes after new game
        box.innerText = "";
    }
};
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Btn was clicked");
        if(turn0){ // turn of player0
            box.innerText = "O";
            box.style.color = "red";
            turn0 = false;
        }
        else{ // turn of playerX
            box.innerText = "X";
            box.style.color = "green";
            turn0 = true;
        }
        box.disabled = true;  // ek vaar change karya pachi change na thy
        count++;

         let isWinner = checkWinner();

         if (count === 9 && !isWinner) {
            gameDraw();
         }
    });
});
const disableBoxes =()=>{
    for(let box of  boxes){
        box.disabled = true;  // disable all other boxes
    }
};
const showWinner = (winner)=>{  // winner function display
    msg.innerText = `Congratulation,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = ()=>{
    for( let pattern of winPatterns){
        
        let pos1Val = boxes[pattern[0]].innerText; // position 1
        let pos2Val = boxes[pattern[1]].innerText; // position 2
        let pos3Val = boxes[pattern[2]].innerText ; // position 3

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner !" , pos1Val);
                showWinner(pos1Val);
                return true;
            }
            // else{
            //     return false;
            // }
        }
    }
};
newBtn.addEventListener("click",resetGame);  // new game par click karta reset game nu fuction triger thyy
resetBtn.addEventListener("click",resetGame); 