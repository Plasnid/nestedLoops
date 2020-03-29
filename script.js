/**
 * *so many different games are based around nested loops, games like:
 * *Tetris
 * *Bombadier
 * *Candy Crush
 * *Super Geebo Geebo Blaster(early 2000's, heavy.com....I seriously miss that game)
 */

// *they often look like this:

let gameBoard = [
    ["X","X","O"],
    ["X","O","O"],
    ["X","O","X"]
]

//* the code above is from tic tac toe
//* so how do we navigate this?
//* lets first look at the values of game board!

//* what is gameBoard[0]
console.log(gameBoard[0]); //* [null,null,null] ....it gave us back an array...its an array in an array!
//*guess what, gameBoard[1] and gameBoard[2], will give you the next two elements of that array
console.log(gameBoard[1]);
console.log(gameBoard[2]);

//*  well thats cool, but how do I get one of the values?
//*  the clue is in what all those logs return...an array
//*  so if we treat all their returns like an array, we can just throw another [] at the end to look at the values

//*  lets try that with the upper left corner, which is gameBoard[0][0], why is that the upper left corner?
//* because the way we access the values is flipped from typicaly co-ordinates
//* usually it is x, then y... NOT ANYMORE!  Now it is Y then X, like this gameBoard[yCo-ordinate][xCoordinate]
//* This should give us back an X...does it?  Lets try

console.log(gameBoard[0][0]);//  *Yaaay!  It works!

