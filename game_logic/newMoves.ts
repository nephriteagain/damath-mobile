import { boxPiece, piece } from "../lib/data";
import { coordinates } from "../types";

/**
 * 
 * @param boardData 
 * @param piece 
 * @param c the coordinate of the selected piece
 * @returns a piece with updated moves
 */
function getPieceWithNewMoves(
    boardData: Array<boxPiece>, 
    piece: piece, 
    c: coordinates
) : piece {
    const { type, isKing } = piece
    const newMoves : number[] = [];
    if (type === 'z' && !isKing) {
        const topLeftBlock = boardData.find(b => b.x === c.x - 1 && b.y === c.y + 1)
        const topRightBlock = boardData.find(b => b.x === c.x + 1 && b.y === c.y + 1)
        if (topLeftBlock && topLeftBlock?.playable && !topLeftBlock.piece) {
            newMoves.push(boardData.indexOf(topLeftBlock))
        }
        if (topRightBlock && topRightBlock?.playable && !topRightBlock.piece) {
            newMoves.push(boardData.indexOf(topRightBlock))
        }
    }
    if (type === 'x' && !isKing) {
        const botLeftBlock = boardData.find(b => b.x === c.x - 1 && b.y === c.y - 1)
        const botRightBlock = boardData.find(b => b.x === c.x + 1 && b.y === c.y - 1)
        if (botLeftBlock && botLeftBlock?.playable && !botLeftBlock.piece) {
            newMoves.push(boardData.indexOf(botLeftBlock))
        }
        if (botRightBlock && botRightBlock?.playable && !botRightBlock.piece) {
            newMoves.push(boardData.indexOf(botRightBlock))
        }
    }

    return {
        ...piece,
        moves: newMoves
    }
}

/**
 * 
 * @param boardData 
 * @returns a new board with all pieces updated their moves
 */
export function getBoardWithUpdatedMoves(boardData: Array<boxPiece>) : Array<boxPiece> {
    return boardData.map(b => {
        if (!b.piece) {
            return b
        }

        return {
            ...b,
            piece: getPieceWithNewMoves(
                boardData, 
                b.piece, 
                {x:b.x, y: b.y}
            )
        }
    })
}