

const cellElements = document.querySelectorAll('[data-cell]'); /* Getting An Array Of All Data-Cells */

const board = document.getElementById('board');

const restartButton = document.getElementById('restartButton');

let circleTurn = false;
const X_Class = 'x';
const Circle_Class = 'circle';

const Winning_Combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');

startGame();

function startGame(){
    cellElements.forEach(cell => {
        cell.classList.remove(X_Class);
        cell.classList.remove(Circle_Class);            /* Restart */
        cell.removeEventListener('click', handleClick)

        cell.addEventListener('click', handleClick, {once: true})   /* Creating An Event listener for 'click' - hanldeClick() - only valid once! */
    });
    setBoardHoverClass();

    winningMessageElement.classList.remove('show');
};

restartButton.addEventListener('click', startGame)

function handleClick(clickObj){

    const cell = clickObj.target;
    const currentClass = circleTurn ? Circle_Class : X_Class;

    placeMark(cell, currentClass);  /* Placing The x/circle Cell Class */

    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
     else {
        swapTurns();
        setBoardHoverClass();
    }

};

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn;
}
function setBoardHoverClass() {         /* Adding Hover Class To the Board According To Turn */
    board.classList.remove(X_Class);
    board.classList.remove(Circle_Class);
    if (circleTurn){
        board.classList.add(Circle_Class);
    }
    else{
        board.classList.add(X_Class);
    }
}
function checkWin(currentClass) {
    return Winning_Combo.some(combination => {  /* Returns true if any of the values of winning combo is true*/
      return combination.every(index => {        /* Check if all the values of the combo are from the same class */
        return cellElements[index].classList.contains(currentClass)     /* If the currentClass appears in the winning combo return true*/
      })
    })
  }


function endGame(draw){
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}
function isDraw() {
    return [...cellElements].every(cell => {    /* Destructure the element into an array - ... = getting all the elements */ 
        return cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    })
}