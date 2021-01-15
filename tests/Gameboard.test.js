const Gameboard = require('../src/Gameboard')

let gameboard

beforeEach(() => {
    gameboard = Gameboard()
})

describe('Gameboard() is created correctly: getGameboard()', () => {
    test('Gameboard() length is correct', () => {
        expect(gameboard.getGameboard().length).toBe(10)
        expect(gameboard.getGameboard()[0].length).toBe(10)
    })

    test('all ships are assigned positions', () => {
        let sum = 0
        gameboard.getGameboard().forEach( row => {
            for(let i=0; i< row.length; i++){
                if(row[i] === -1) sum += 1
            }
        })
        expect(sum).toBe(78) // sum of the length of ships = 22
    })
})

describe('Attack is received correctly: receiveAttack()', () => {
    test('attack is received correctly', () => {
        let returnValue = gameboard.receiveAttack(5,5)
        expect(returnValue === 'hit' ||
            returnValue === 'missed' || 
            returnValue === 'occupied').toBe(true)      
    })

    test('battleship when occupied, returns correct value', () => {
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++) {
                gameboard.receiveAttack(i,j)
            }
        }
        expect(gameboard.receiveAttack(1,1)).toBe('occupied')
        expect(gameboard.receiveAttack(2,7)).toBe('occupied')
    })

})

describe('isAllShipsSunks() returns correct value', () => {
    test('attack is received correctly', () => {
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++) {
                gameboard.receiveAttack(i,j)
            }
        }
        expect(gameboard.isAllShipSunk()).toBe(true)

    })

})

describe('getShips() returns correct value', () => {
    test('number of ships is correct', () => {
        expect(gameboard.getShips().length).toBe(7)
    })

    test('ships are assigned correctly', () => {
        expect(gameboard.getShips()[0].getLength()).toBe(5)
        expect(gameboard.getShips()[2].getLength()).toBe(3)
        expect(gameboard.getShips()[5].getLength()).toBe(2)
    })
})

describe('resetGameboard() resets the gameboard correctly', () => {
    test('board is reset correctly', () => {
        let sum = 0
        gameboard.receiveAttack(1,1)
        gameboard.receiveAttack(4,5)
        gameboard.resetGameboard()
        gameboard.getGameboard().forEach( row => {
            for(let i=0; i< row.length; i++){
                if(row[i] === -1) sum += 1
            }
        })
        expect(sum).toBe(78) 
    })
})