const xClass = "x"
const oClass = "o"
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
let oTurn
const turnText = document.querySelector("#turnText");
let toggle = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

function startGame() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener("click", handleClick,  {once: true} )
})
setBoardHoverClass
}

function handleClick(event) {
    const cell = event.target
    const currentClass = oTurn ? oClass : xClass
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
        return
    }
    swapTurns()
    setBoardHoverClass()
    turnText.textContent = toggle ? "Spelare: o": "Spelare: x"
    toggle = !toggle;
}

function endGame(draw) {
    if (draw) {

    } else {
        turnText.textContent = `${oTurn ? "Spelare o vann!" : "Spelare x vann!"}`
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (oTurn) {
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}