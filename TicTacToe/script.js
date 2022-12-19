const xClass = "x"
const circleClass = "circle"
const cellElements = document.querySelectorAll("[data-cell]")
let circleTurn

cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick,  {once: true} )
})

function handleClick(event) {
    const cell = event.target
    const currentClass = circleTurn ? circleClass : xClass
    placeMark(cell, currentClass)
    swapTurns()
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn = !circleTurn
}