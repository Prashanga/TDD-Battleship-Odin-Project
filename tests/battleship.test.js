const Ship = require('../src/Ship')
const Gameboard = require('../src/Gameboard')
const Player = require('../src/Player')

let carrier
let battleship
let patrolboat
let incorrect
let submarine
let destroyer

beforeEach(() => {
    carrier = Ship('carrier')
    battleship = Ship('battleship')
    patrolboat = Ship('patrolboat')
    submarine = Ship('submarine')
    destroyer = Ship('destroyer')
    incorrect = Ship('kjsdfkj')
    Gameboard.resetGameboard()
})
describe('ship is correct', () => {
    
    test('carrier size is correct', () => {
        expect(carrier.getLength()).toBe(5);
    });
    test('battleship size is correct', () => {
        expect(battleship.getLength()).toBe(4);
    }); 
     test('destroyer size is correct', () => {
        expect(destroyer.getLength()).toBe(3);
    }); 
     test('incorrect ship returns -101', () => {
        expect(incorrect.getLength()).toBe(-101);
    }); 

})

describe('hit() is correct', () => {
    
    test('carrier ship is correcty hit', () => {
        carrier.hit()
        expect(carrier.getHits()).toBe(1);
        carrier.hit()
        expect(carrier.getHits()).toBe(2);
    });
    test('patrolboat is correcty hit', () => {
        patrolboat.hit()
        expect(patrolboat.getHits()).toBe(1);
        patrolboat.hit()
        expect(patrolboat.getHits()).toBe(2);
    });

    test('hit() returns an error when hit more times than the length 1', () => {
        expect(() => {
            patrolboat.hit()
            patrolboat.hit()
            patrolboat.hit()
        }).toThrowError('Ship already sunk')
    })
    
    test('hit() returns an error when hit more times than the length 2', () => {
        expect(() => {
            submarine.hit()
            submarine.hit()
            submarine.hit()
            submarine.hit()
        }).toThrowError('Ship already sunk')
    })

})

describe('ship sinks correctly', () => {
    test('carrier ship sinks correcty', () => {
        carrier.hit()
        expect(carrier.isSunk()).toBe(false);
        carrier.hit()
        carrier.hit()
        carrier.hit()
        carrier.hit()
        expect(carrier.isSunk()).toBe(true);
    });
    test('submarine sinks correcty', () => {
        submarine.hit()
        expect(submarine.isSunk()).toBe(false);
        submarine.hit()
        submarine.hit()
        expect(submarine.isSunk()).toBe(true);
    });

})

describe('Player is created correctly', () => {
    const player = Player(1, 'Test Player')
    test('Player Number is correct', () => {
        expect(player.getNumber()).toBe(1)
    })
    test('Player Name is correct', () => {
        expect(player.getName()).toBe('Test Player')
    })
})

describe('Gameboard is created correctly', () => {
    test('Gameboard length is correct', () => {
        expect(Gameboard.getGameboard().length).toBe(10)
        expect(Gameboard.getGameboard()[0].length).toBe(10)
    })

    test('all ships are assigned positions', () => {
        let sum = 0
        Gameboard.getGameboard().forEach( row => {
            for(let i=0; i< row.length; i++){
                if(row[i] === -1) sum += 1
            }
        })
        expect(sum).toBe(78) // sum of the length of ships = 22
    })
})

describe('attack is received correctly: receiveAttack()', () => {

    test('attack is received correctly', () => {
        let returnValue = Gameboard.receiveAttack(5,5)
        expect(returnValue === 'hit' ||
            returnValue === 'missed').toBe(true)      
    })
    test('battleship when occupied, returns correct value', () => {
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++) {
                Gameboard.receiveAttack(i,j)
            }
        }
        expect(Gameboard.receiveAttack(1,1)) .toBe('occupied')
        expect(Gameboard.receiveAttack(2,7)) .toBe('occupied')
    })

})

describe('isAllShipsSunks returns correct value', () => {
    test('attack is received correctly', () => {
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++) {
                Gameboard.receiveAttack(i,j)
            }
        }
        expect(Gameboard.isAllShipSunk()).toBe(true)

    })

})