import { PieceI, BoardI, coordinates } from "../types";

import { updateRegularJumps, updateKingJumps } from "./classHelpers"

export function updatePieceWithNewJumps(piece: PieceI, boardData: BoardI) : Array<coordinates> {
    const newMoves : Array<coordinates> = [];

    const pieceBlock = boardData.board.find(b => b.piece && b.piece.type === piece.type && b.piece.value === piece.value)
    if (!pieceBlock) {
        throw new Error('piece not found')
    }
    const { type , isKing } = piece
    if (!isKing) {
        updateRegularJumps(pieceBlock, newMoves, type)
    }
    if (isKing) {
        updateKingJumps(pieceBlock, piece, newMoves)
    }
    return newMoves
}