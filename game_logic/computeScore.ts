import { PieceI, operation, BoardI } from "../types"

/**
 * @description calculates the total score of the current move
 */
export function computeScore(movedPiece: PieceI, capturedPiece: PieceI, destinationOperation: operation, boardData: BoardI) : void {
    const kingMultiplier =
        movedPiece.isKing && capturedPiece.isKing ? 
        4 :
        movedPiece.isKing || capturedPiece.isKing ?
        2 :
        1


    if (destinationOperation === operation.ADD) {            
        const total = movedPiece.value + capturedPiece.value
        boardData.score = total * kingMultiplier
        return
    }
    if (destinationOperation === operation.SUBTRACT) {
        const total = movedPiece.value - capturedPiece.value
        boardData.score = total * kingMultiplier
        return
    }
    if (destinationOperation === operation.MULTIPLY) {
        const total = movedPiece.value * capturedPiece.value
        boardData.score = total * kingMultiplier
        return
    }
    if (destinationOperation === operation.DIVIDE) {
        if (capturedPiece.value === 0) {
             boardData.score = 0
             return
        }
        const total = (movedPiece.value / capturedPiece.value) * kingMultiplier
        boardData.score = Number(total.toFixed(2))
        return
    }
    boardData.score = 0
    return
}