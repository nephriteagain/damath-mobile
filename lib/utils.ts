import { BlockI } from "../types";



export function makeC(x:number,y:number) : {x:number,y:number} {
    return {x,y}
}

export function generateBoardCoordinate() :  Array<{x:number;y:number}> {
    let x = 0;
    let y = 7;
    const coordinateArr : Array<{x:number;y:number}> = []

    while  (y >= 0) {
        while (x <= 7) {
            coordinateArr.push({x,y})
            ++x
        }
        x = 0
        --y
    }

    return coordinateArr
}

/**
 * 
 * @param board the game board
 * @param nextPlayer the next player to move
 * @returns {boolean}
 * @description checks if the next player has a move to play
 */
export function gameOverChecker(board: Array<BlockI>, nextPlayer: 'x'|'z') : boolean {    
    let nextPlayerHasMoves = false;
    for (let i = 0; i < board.length; i++) {
        const b = board[i];
        if (
            b.piece && 
            b.piece.type === nextPlayer && 
            b.piece.moves.length > 0
        ) {
            nextPlayerHasMoves = true;
            break;
        }
    }

    
    if (nextPlayerHasMoves === false) {
        return true
    }

    return false
}