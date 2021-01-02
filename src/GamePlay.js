const GameBoard = require('./Gameboard')
const Player = require('./Player')
const { shipColors } = require('../utils/shipColors')

const gameBoard1 = GameBoard()
const gameBoard2 = GameBoard()

const fillSingleBox = (val, div, hit=false) => {
    let stringVal = val.toString()
    const boxColor = shipColors[stringVal]
    div.style.cssText = `background-color: ${boxColor}` //; color: red`
    if(hit){
        div.innerHTML = 'X'
        div.classList.add('box-hit-x')
    } 
        
}

const makeMove = (event) => {
    const row = event.target.getAttribute('row')
    const column = event.target.getAttribute('column')
    const valueBeforeAttack = gameBoard1.getGameboard()[row][column]
    const attack = gameBoard1.receiveAttack(row,column)
    // console.log("Value after attack:    ", gameBoard1.getGameboard()[row][column])
    console.log(attack)
    if(attack === 'missed') {
        event.target.innerHTML = '.'
    }
    else if(attack === 'hit') {
        fillSingleBox(valueBeforeAttack, event.target, true)
    }
    
}

const createBoards = () => {
    const gameBoard1Div = document.getElementById('game-board-1')
    const gameBoard2Div = document.getElementById('game-board-2')
    // const gameBoard3Div = document.getElementById('game-board-3')
    // const gameBoard4Div = document.getElementById('game-board-4')

    const create10RowCols = (gameboardDiv, gameboard, name) => {
        for(let i=0; i<10; i++) {
           let row = document.createElement('div')
           row.id = `${name}-row${i+1}`
           row.className = 'row'
           gameboardDiv.appendChild(row)
           for( let j=0; j<10; j++) {
               let box = document.createElement('div')
               box.id = `${name}-r${i+1}-c${j+1}`
               box.className = 'box'
               box.setAttribute('row', i)
               box.setAttribute('column', j)
               let val = gameboard.getGameboard()[i][j]
               if(name === 'gb1') box.addEventListener('click', makeMove)
               if(name === 'gb2') fillSingleBox(val, box)
               row.appendChild(box)

           }
        }
    }

    create10RowCols(gameBoard1Div, gameBoard1,'gb1')
    create10RowCols(gameBoard2Div, gameBoard2, 'gb2')
    // create10RowCols(gameBoard3, 'gb3')
    // create10RowCols(gameBoard4, 'gb4')

}

const GamePlay = (() => {
    const player1 = Player(1,'Player 1')
    const player2 = Player(2,'Computer')

    createBoards()
    gameBoard1.setPlayer(player1)
    gameBoard2.setPlayer(player2)
    console.log(player1.getName())
})()

module.exports = GamePlay

