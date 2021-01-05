const Ship = require('./Ship')

const Gameboard = () => {

    let gameboard = [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ]

    let carrier = Ship('carrier')
    let battleship = Ship('battleship')
    let destroyer = Ship('destroyer')
    let submarine1 = Ship('submarine')
    let submarine2 = Ship('submarine')
    let patrolboat1 = Ship('patrolboat')
    let patrolboat2 = Ship('patrolboat')

    let ships = [carrier, battleship, destroyer, submarine1, submarine2, patrolboat1, patrolboat2]


    const assignPosition = (ship,index) => {
        const direction = Math.random() 
        let xPosition
        let yPosition
        let isLooping = true
        if(direction < 0.5) { // Vertical allocation
            while(isLooping) {
                let testY = Math.floor(Math.random() * 10) // 0 - 9
                let testX = Math.floor(Math.random() * 10) // 0 - 9
                if(testX + (ship.getLength() - 1) <= 9) {
                    let sum = 0
                    for( let i = testX; i < testX + ship.getLength(); i++) { //If positions not already occupied
                        if(gameboard[i][testY] === -1 ) sum+=1
                    }
                    if(sum === ship.getLength()) {
                        xPosition = testX
                        yPosition = testY
                        isLooping = false
                    }                    
                }
            }
            for( let i = xPosition; i < xPosition + ship.getLength(); i++) {
                gameboard[i][yPosition] = index
            }
        }
        else {
             while(isLooping) {
                let testY = Math.floor(Math.random() * 10) // 0 - 9
                let testX = Math.floor(Math.random() * 10) // 0 - 9
                if(testY + (ship.getLength() - 1) <= 9) {
                    let sum = 0
                    for( let i = testY; i < testY + ship.getLength(); i++) {
                        if(gameboard[testX][i] === -1 ) sum+=1
                    }
                    if(sum === ship.getLength()) {
                        xPosition = testX
                        yPosition = testY
                        isLooping = false
                    }                    
                }
            }
            for( let i = yPosition; i < yPosition + ship.getLength(); i++) {
                gameboard[xPosition][i] = index
            }
        }
    }

    const assignAllShips = () => {
        ships.forEach((ship,index) => assignPosition(ship,index))
    }

    const resetGameboard = () => {
        gameboard = [
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
        ]
        carrier = Ship('carrier')
        battleship = Ship('battleship')
        destroyer = Ship('destroyer')
        submarine1 = Ship('submarine')
        submarine2 = Ship('submarine')
        patrolboat1 = Ship('patrolboat')
        patrolboat2 = Ship('patrolboat')
        ships = [carrier, battleship, destroyer, submarine1, submarine2, patrolboat1, patrolboat2]
        assignAllShips()
    }

    resetGameboard()

    const getGameboard = () => gameboard

    const getShips = () => ships

    const receiveAttack = (x,y) => {
        // -23 --> ship hit and -46 --> attack missed
        let gameBoardValue = gameboard[x][y]
        if(gameBoardValue === -23 || gameBoardValue === -46) return 'occupied'
        else if(gameBoardValue === -1) {
            gameboard[x][y] = -46
            return 'missed'
        }
        else {
            let shipHit = ships[gameBoardValue]
            shipHit.hit()
            gameboard[x][y] = -23
            return 'hit'
        }
    }

    const isAllShipSunk = () => {
        let sunk = ships.filter(ship => ship.isSunk())
        return sunk.length === ships.length
    }

    return {
        getGameboard,
        getShips,
        receiveAttack,
        resetGameboard,
        isAllShipSunk,
    }
}

module.exports = Gameboard