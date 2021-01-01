const GameBoard = require('./Gameboard')
const Player = require('./Player')

const GamePlay = (() => {

    const gameBoard1 = GameBoard
    const gameBoard2 = GameBoard
    const player1 = Player(1,'Player 1')
    const player2 = Player(2,'Computer')

    gameBoard1.setPlayer(player1)
    gameBoard2.setPlayer(player2)
    console.log(player2.getName())
})()

module.exports = GamePlay

