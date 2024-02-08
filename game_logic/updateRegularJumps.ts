

import { BlockI, coordinates } from "../types"
import { isBlockWithOppositePiece, isBlockEmpty } from "./classHelpers"

/**
 * @description checks and update all possible jump of a regular piece
 */
export function updateRegularJumps(pieceBlock: BlockI, newMoves: Array<coordinates>, type: 'x'|'z') {
    if (
        pieceBlock.botLeft && isBlockWithOppositePiece(pieceBlock.botLeft, type) &&
        pieceBlock.botLeft.botLeft && isBlockEmpty(pieceBlock.botLeft.botLeft)
    ) {            
        newMoves.push(pieceBlock.botLeft.botLeft.coordinates)
    }
    if (
        pieceBlock.botRight && isBlockWithOppositePiece(pieceBlock.botRight, type) &&
        pieceBlock.botRight.botRight && isBlockEmpty(pieceBlock.botRight.botRight)
    ) {
        newMoves.push(pieceBlock.botRight.botRight.coordinates)
    }
    if (
        pieceBlock.topLeft && isBlockWithOppositePiece(pieceBlock.topLeft, type) &&
        pieceBlock.topLeft.topLeft && isBlockEmpty(pieceBlock.topLeft.topLeft)
    ) {
        newMoves.push(pieceBlock.topLeft.topLeft.coordinates)
    }
    if (
        pieceBlock.topRight && isBlockWithOppositePiece(pieceBlock.topRight, type) &&
        pieceBlock.topRight.topRight && isBlockEmpty(pieceBlock.topRight.topRight)
    ) {
        newMoves.push(pieceBlock.topRight.topRight.coordinates)
    }
}