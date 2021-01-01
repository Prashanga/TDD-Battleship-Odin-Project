const Player = (num, playerName) => {
    const getName = () => playerName
    const getNumber = () => num

    return {
        getName,
        getNumber
    }
}

module.exports = Player