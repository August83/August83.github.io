const xClass = "x"
const oClass = "o"
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
let oTurn
let startingPlayer = "o"
const turnText = document.querySelector("#turnText")
const oPoints = document.querySelector("#oPoints")
const xPoints = document.querySelector("#xPoints")
const tiePoints = document.querySelector("#tiePoints")
let toggle = true;
const restartButton = document.getElementById("restartButton")
let gameEnded = false
let oScore = 0;
let xScore = 0;
let tieScore = 0;
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

restartButton.addEventListener("click", startGame)

function startGame() {
    gameEnded = false
    oTurn = startingPlayer === "o"
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick,  {once: true} )
})
    swapTurns()
    setBoardHoverClass()
    startingPlayer = startingPlayer === "o" ? "x" : "o"
}

function handleClick(event) {
    if (gameEnded) {
        return
    }
    const cell = event.target
    const currentClass = oTurn ? oClass : xClass
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
        return
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
}
    }

function endGame(draw) {
    gameEnded = true
    if (draw) {
        tieScore++
        tiePoints.textContent = tieScore
        turnText.textContent = "Oavgjort!"
    } else {
        turnText.textContent = `${oTurn ? "Spelare o vann!" : "Spelare x vann!"}`
       if (oTurn){
        oScore++
        oPoints.textContent = oScore
        
       }
       else {
        xScore++;
        xPoints.textContent = xScore
       }
    }
    setBoardHoverClass()
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) ||
        cell.classList.contains(oClass)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn;
    if (oTurn) {
        turnText.textContent = "Spelare: o"
    } else 
        turnText.textContent = "Spelare: x"
}

function setBoardHoverClass() {
console.log(true)
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (gameEnded) {
        board.classList.add("game-ended")
        return
    } else {
        board.classList.remove("game-ended")
     if (oTurn) {
        board.classList.add(oClass)
        } else {
        board.classList.add(xClass)
    }}
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}