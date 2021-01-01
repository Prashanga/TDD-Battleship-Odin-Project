const Ship = (typeOfShip) => {
    let length
    let hits = 0
    // 0 = not Hit, 1 = Hit
    
    switch(typeOfShip) {
        case 'carrier':
            length = 5
            break
        case 'battleship':
            length = 4
            break
        case 'destroyer':
            length = 3
            break
        case 'submarine':
            length = 3
            break
        case 'patrolboat':
            length = 2
            break
        default:
            length = -101
            break
    }


    const getLength = () => length


    const hit = () => {
        if( hits >= length) throw new Error('Ship already sunk')
        else hits += 1
    }
        
    
    const isSunk = () => {
        if(hits === length) return true
        else return false
    }
    
    const getHits = () => hits

    return {
        getLength,
        getHits,
        hit,
        isSunk
    }
}


module.exports = Ship