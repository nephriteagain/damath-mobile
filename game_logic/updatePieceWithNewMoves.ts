import { PieceI, BoardI, coordinates } from "../types";
import { updateRegularMoves, updateKingMoves } from "./classHelpers"

/**
 *@description update the the moves of the selected piece 
 */
export function updatePieceWithNewMoves(piece: PieceI, boardData: BoardI) : Array<coordinates> {
    const newMoves : Array<coordinates> = [];
    const pieceBlock = boardData.board.find(b => b.piece && b.piece.type === piece.type && b.piece.value === piece.value)
    if (!pieceBlock) {
        throw new Error('piece not found')
    }
    const { type , isKing } = piece
    if (!isKing) {                           
        updateRegularMoves(pieceBlock, newMoves, type)
    }
    if (isKing) {
        updateKingMoves(pieceBlock, newMoves)
    }

    
    return newMoves
}