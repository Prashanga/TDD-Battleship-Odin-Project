const Player = require('../src/Player')

describe('Player is cerated correctly', () => {    
    
    const player = Player(1, 'Test Player')

    test('Player Number is correct', () => {
        expect(player.getNumber()).toBe(1)
    })
    
    test('Player Name is correct', () => {
        expect(player.getName()).toBe('Test Player')
    })
})
