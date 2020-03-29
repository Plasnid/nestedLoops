let winningCombos = [
    [{y:0,x:0}, {y:0,x:1}, {y:0, x:2}],  //*top row win
    [{y:1,x:0}, {y:1,x:1}, {y:1, x:2}],  //* middle row win
    [{y:2,x:0}, {y:2,x:1}, {y:2, x:2}], //* bottom row win
    [{y:0,x:0}, {y:1,x:0}, {y:2, x:0}], //* left column win
    [{y:0,x:1}, {y:1,x:1}, {y:2, x:1}], //* middle column win
    [{y:0,x:2}, {y:1,x:2}, {y:2, x:2}], //* right column win
    [{y:0,x:0}, {y:1,x:1}, {y:2, x:2}], //* diagonal top left to bottom right
    [{y:2,x:0}, {y:1,x:1}, {y:0, x:2}]  //* diagonal bottom left to top right
]
let betterBoard;
let winner;

function generateBoard(){
    betterBoard = [];
    for(let yVal=0;yVal<3;yVal++){
        let boardRow=[];
        for(let xVal=0;xVal<3;xVal++){
            let cellVal = {loc:document.querySelector(`#cell_${yVal}_${xVal}`), val:null};
            cellVal.loc.innerText = "";
            boardRow.push(cellVal);
        }
        betterBoard.push(boardRow);
    }
}

function checkWinner(){
    console.log("checking for a winner");
    for(let i=0;i<winningCombos.length;i++){
        let winCheck=[];
        for(let j=0;j<winningCombos[i].length;j++){
            let cellVal = betterBoard[winningCombos[i][j].y][winningCombos[i][j].x].val;
            winCheck.push(cellVal);
        }
        if(winCheck[0] && winCheck[0]==winCheck[1] && winCheck[0]==winCheck[2]){
            document.querySelector("h1").innerText=`The Winner is ${winCheck[0]}`;
            winner = winCheck[0];
            break;
        }
    }
    if(winner==null){
        console.log("It was a tie");
        document.querySelector("h1").innerText=`It was a tie!`;
    }
}

function playGame(){
    winner = null;
    let numTurns = 0;
    let xIsNext = true;
    generateBoard();
    console.log(betterBoard);
    while(numTurns<9 && winner==null){
        let xPos = Math.floor(Math.random()*3);
        let yPos = Math.floor(Math.random()*3);
        if(betterBoard[yPos][xPos].val==null){
            let roundVal = xIsNext? "X":"O";
            betterBoard[yPos][xPos].val = roundVal;
            betterBoard[yPos][xPos].loc.innerText = roundVal;
            xIsNext = !xIsNext;
            numTurns+=1;
            checkWinner()
        }
    }
}
function init(){
    console.log("I am initialized!");
    let playBtn = document.querySelector("#playGame");
    playBtn.addEventListener("click", playGame);
}
document.addEventListener("DOMContentLoaded", init());