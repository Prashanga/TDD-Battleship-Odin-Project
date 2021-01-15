const GameBoard = require('./Gameboard')
const Player = require('./Player')
const { shipColors } = require('../utils/shipColors')

const gameBoard1 = GameBoard()
const gameBoard2 = GameBoard()
const player1 = Player(1,'Player')
const player2 = Player(2,'Computer')
let currentPlayerDiv = document.getElementById('current-player-text')
let currentPlayer
let gameOver = false

const fillSingleBox = (val, div, type) => {
    let stringVal = val.toString()
    const boxColor = shipColors[stringVal]
    if(type === 'buildNew') {
        div.style.cssText = `background-color: ${boxColor}`
    }
    else if(type === 'hit'){
        div.innerHTML = 'X'
        div.classList.add('box-hit-x')
        div.style.cssText = `background-color: ${boxColor}`
    } 
    else if(type === 'miss'){
        div.innerHTML = 'o'
        div.classList.add('box-miss-o')
    }

}

const fillInfoShips = () => {
    const fill = (idName, gameboard) => {
        const ships = gameboard.getShips()
        const gameProgressDiv = document.getElementById(idName)
        gameProgressDiv.innerHTML = ''
        ships.forEach( ship => {
            let shipLength = ship.getLength()
            let hits = ship.getHits()
            let indivShip = document.createElement('div')
            indivShip.className = 'ship-list'

            for(let i=0; i<shipLength; i++) {
                let div = document.createElement('div')
                div.className = 'ship-list-individual'
                if(hits > 0) div.classList.add('ship-list-individual-hit')
                hits -= 1
                indivShip.appendChild(div)
            }
            gameProgressDiv.appendChild(indivShip)
        })
    }

    fill('gb1-progress', gameBoard1)
    fill('gb2-progress' , gameBoard2)
}

const changeCurrentPlayer = () => {
    if(currentPlayer === player1) currentPlayer = player2
    else currentPlayer = player1
    currentPlayerDiv.innerHTML = `<h3> Current Player: ${currentPlayer.getName()}</h3>`
}

const makePlayerMove = (event) => {
    if(currentPlayer !== player1 || gameOver) return
    const row = event.target.getAttribute('row')
    const column = event.target.getAttribute('column')
    const valueBeforeAttack = gameBoard1.getGameboard()[row][column]
    const attack = gameBoard1.receiveAttack(row,column)

    if(attack === 'occupied') return
    else if(attack === 'missed') {
        fillSingleBox(valueBeforeAttack, event.target, 'miss')
    }
    else if(attack === 'hit') {
        fillSingleBox(valueBeforeAttack, event.target, 'hit')
    }
    checkGameOver()
    if(!gameOver) {
        changeCurrentPlayer()
        makeComputerMove()  
    }
}


const makeComputerMove = () => {
    const move = () => {    
        if(currentPlayer !== player2 || gameOver) return
        let isLooping = true
        
        while(isLooping) {
            let testY = Math.floor(Math.random() * 10)
            let testX = Math.floor(Math.random() * 10)
            let valueBeforeAttack = gameBoard2.getGameboard()[testX][testY]
            if( valueBeforeAttack !== -23 && valueBeforeAttack !== -46 ){
                let attack = gameBoard2.receiveAttack(testX, testY)
                let boxDiv = document.getElementById(`gb2-r${testX}-c${testY}`)
                if(attack === 'missed') {
                    fillSingleBox(valueBeforeAttack, boxDiv, 'miss')
                }
                else if(attack === 'hit') {
                    fillSingleBox(valueBeforeAttack, boxDiv, 'hit')
                }
                isLooping = false
            }
        }
        checkGameOver()
        if(!gameOver) changeCurrentPlayer()
    }
    
    window.setTimeout(move, 1000)
}

const createBoards = () => {
    const gameBoard1Div = document.getElementById('game-board-1')
    const gameBoard2Div = document.getElementById('game-board-2')

    const create10RowCols = (gameboardDiv, gameboard, name) => {
        for(let i=0; i<10; i++) {
           let row = document.createElement('div')
           row.id = `${name}-row${i}`
           row.className = 'row'
           gameboardDiv.appendChild(row)
           for( let j=0; j<10; j++) {
               let box = document.createElement('div')
               box.id = `${name}-r${i}-c${j}`
               box.className = 'box'
               box.setAttribute('row', i)
               box.setAttribute('column', j)
               let val = gameboard.getGameboard()[i][j]
               if(name === 'gb1') box.addEventListener('click', makePlayerMove)
               if(name === 'gb2') fillSingleBox(val, box, 'buildNew') // Fill the second board with boat colors at start
               row.appendChild(box)
            }
        }
    }
    create10RowCols(gameBoard1Div, gameBoard1,'gb1')
    create10RowCols(gameBoard2Div, gameBoard2, 'gb2')
}

const checkGameOver = () => {
    let gameboard
    if(currentPlayer === player1) gameboard = gameBoard1
    else if(currentPlayer === player2) gameboard = gameBoard2
    if(gameboard.isAllShipSunk()) {
        gameOver = true
        winner = currentPlayer
    }
    fillInfoShips()
    currentPlayerDiv.innerHTML = `<h3> Winner: ${currentPlayer.getName()}</h3>`
}

const GamePlay = (() => {
    if(Math.random() < 0.5) currentPlayer = player1
    else currentPlayer = player2
    changeCurrentPlayer()
    createBoards()
    fillInfoShips()
    if(currentPlayer === player2) makeComputerMove()
})()

module.exports = GamePlay

