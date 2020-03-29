/**
 * *so many different games are based around nested loops, games like:
 * *Tetris
 * *Bombadier
 * *Candy Crush
 * *Super Geebo Geebo Blaster(early 2000's, heavy.com....I seriously miss that game)
 */

// *they often look like this:

let rudimentaryGameBoard = [
    ["X","X","O"],
    ["X","O","O"],
    ["X","O","X"]
]

//* the code above is from tic tac toe
//* so how do we navigate this?
//* lets first look at the values of game board!

//* what is gameBoard[0]
console.log(rudimentaryGameBoard[0]); //* [null,null,null] ....it gave us back an array...its an array in an array!
//*guess what, gameBoard[1] and gameBoard[2], will give you the next two elements of that array
console.log(rudimentaryGameBoard[1]);
console.log(rudimentaryGameBoard[2]);

//*  well thats cool, but how do I get one of the values?
//*  the clue is in what all those logs return...an array
//*  so if we treat all their returns like an array, we can just throw another [] at the end to look at the values

//*  lets try that with the upper left corner, which is gameBoard[0][0], why is that the upper left corner?
//* because the way we access the values is flipped from typicaly co-ordinates
//* usually it is x, then y... NOT ANYMORE!  Now it is Y then X, like this gameBoard[yCo-ordinate][xCoordinate]
//* This should give us back an X...does it?  Lets try

console.log(rudimentaryGameBoard[0][0]);//  *Yaaay!  That is the value of X...what we expected!

/* 
*we can use this to find solutions...some winning patterns here: 
*like [{y:0,x:0}, {y:1,x:0}, {y:2, x:0}]
* or [{y:0,x:0},{y:0,x:1},{y:0,x:2}]
* it would be nice to save all those...how about in a 2d array?
* and perhaps check for winners in an automated fashion with....a nested loop
* lets do both 
*/

// *lets start by creating a list of all possible winning combinations!
// *and look at that, its a 2 dimensional array!
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

// *there you have it!  all the winning combos!
// *now we need a board, lets check out the html
let betterBoard;
let winner;
// *can we do this with a nested loop?
function generateBoard(){
    // *better board will hold onto all the values of the board
    betterBoard = [];
    // *our x and y are flipped.  so we loop through y first(0-2)
    for(let yVal=0;yVal<3;yVal++){
        // *we set an array to hold the values for each row of the board
        let boardRow=[];
        // *now we loop through the x values(0-2)
        for(let xVal=0;xVal<3;xVal++){
            // *here we create an object with the value(null, no one played) and the dom element
            let cellVal = {loc:document.querySelector(`#cell_${yVal}_${xVal}`), val:null};
            cellVal.loc.innerText = "";
            // *now we push the object into the array holding the row data
            boardRow.push(cellVal);
        }
        // *here we push the array to the betterBoard
        betterBoard.push(boardRow);
    }
}

function checkWinner(){
    console.log("checking for a winner");
    for(let i=0;i<winningCombos.length;i++){
        let winCheck=[];
        for(let j=0;j<winningCombos[i].length;j++){
            //betterBoard[winningCombo[i][j]]
            // *this is the cell in winning combos showing a square in a winning pattern
            //console.log(i,j)
            // *this shows the object with co-ordinates to the cell on the board
            //console.log(winningCombos[i][j]);
            // *this is the actual cell on the boards
            //console.log(betterBoard[winningCombos[i][j].y][winningCombos[i][j].x]);
            // *this is the value on that actual cell on the board
            //console.log(betterBoard[winningCombos[i][j].y][winningCombos[i][j].x].val);
            // *lets push that value into an array to see if anyone won, or there is a tie
            let cellVal = betterBoard[winningCombos[i][j].y][winningCombos[i][j].x].val;
            winCheck.push(cellVal);
        }
        // *we can only have a winner if the first square isn't null, and matches the other two
        if(winCheck[0] && winCheck[0]==winCheck[1] && winCheck[0]==winCheck[2]){
            console.log(`The winner is ${winCheck[0]}`);
            // *lets spread the good news about the winner
            document.querySelector("h1").innerText=`The Winner is ${winCheck[0]}`;
            // *set the value of winner to break out of the while loop
            winner = winCheck[0];
            // *break out of the for loop
            break;
        }
    }
    if(winner==null){
        console.log("It was a tie");
        document.querySelector("h1").innerText=`It was a tie!`;
    }
}

// *time to generate a game!
function playGame(){
    winner = null;
    // *set our turns to 0.  
    let numTurns = 0;
    // *X always starts
    let xIsNext = true;
    // *lets generate our board
    generateBoard();
    // *our board is a 2d array of objects!
    console.log(betterBoard);
    // *the while loop will keep the game playing until all the squares are filled
    while(numTurns<9 && winner==null){
        // *we can generate random moves each time!
        let xPos = Math.floor(Math.random()*3);
        let yPos = Math.floor(Math.random()*3);
        console.log("cell to play");
        console.log(betterBoard[yPos][xPos]);
        // *if no one has played on the square we picked, we play there
        if(betterBoard[yPos][xPos].val==null){
            console.log("no one has played here!");
            // *who gets the square, x or o?
            let roundVal = xIsNext? "X":"O";
            // *set the value of the square to the roundVal(x or o)
            betterBoard[yPos][xPos].val = roundVal;
            // *set the inner text of the html to the roundVal(x or o)
            betterBoard[yPos][xPos].loc.innerText = roundVal;
            // *now we can switch whos turn it is!
            xIsNext = !xIsNext;
            console.log(betterBoard[yPos][xPos]);
            // *since we found a square to play on, move the turns up by 1
            numTurns+=1;
            // *lets console log the completed game
            console.log(betterBoard);
            // *but who won?
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



