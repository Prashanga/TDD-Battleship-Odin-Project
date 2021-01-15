const Ship = require('../src/Ship')

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
})

describe('ship is correct', () => {
    test('carrier size is correct', () => {
        expect(carrier.getLength()).toBe(5);
    })

    test('battleship size is correct', () => {
        expect(battleship.getLength()).toBe(4);
    }) 

    test('destroyer size is correct', () => {
        expect(destroyer.getLength()).toBe(3);
    }) 

    test('incorrect ship returns -101', () => {
        expect(incorrect.getLength()).toBe(-101);
    }) 

})

describe('hit() is correct', () => {
    test('carrier ship is correcty hit', () => {
        carrier.hit()
        expect(carrier.getHits()).toBe(1);
        carrier.hit()
        expect(carrier.getHits()).toBe(2);
    })

    test('patrolboat is correcty hit', () => {
        patrolboat.hit()
        expect(patrolboat.getHits()).toBe(1);
        patrolboat.hit()
        expect(patrolboat.getHits()).toBe(2);
    })

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
    })

    test('submarine sinks correcty', () => {
        submarine.hit()
        expect(submarine.isSunk()).toBe(false);
        submarine.hit()
        submarine.hit()
        expect(submarine.isSunk()).toBe(true);
    })

})