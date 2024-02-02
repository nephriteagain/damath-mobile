import { boxPiece } from "../lib/data";


/**
 * 
 * @param boardData 
 * @param moves 
 * @returns a new boardData object
 */
export function highlightMoves(boardData: Array<boxPiece>, moves: Array<number>) : Array<boxPiece> {
    return boardData.map((b,i) => {
        if (moves.includes(i)) {
            return {
                ...b,
                hightlighted: true
            }
        }
        if (!b.playable) {
            return b
        }
        return {
            ...b,
            hightlighted: false
        }        
    })
}

/**
 * 
 * @param boardData 
 * @returns a new board with no highlighted blocks
 */
export function resetHighlightMoves(boardData: Array<boxPiece>) {
    return boardData.map((b) => {
        if (!b.playable) {
            return b
        }
        return {
            ...b,
            hightlighted: false
        }
    })
}