import { BlockI, coordinates } from "../types"
import { isBlockEmpty } from "./classHelpers"


/**
 * @description checks and updates all possible move of a regular piece
 */
export function updateRegularMoves(pieceBlock: BlockI, newMoves: Array<coordinates>, type: 'x'|'z') {
    if (type === 'x' && pieceBlock.botLeft && isBlockEmpty(pieceBlock.botLeft)) {
        newMoves.push(pieceBlock.botLeft.coordinates)
    }
    if (type === 'x' && pieceBlock.botRight && isBlockEmpty(pieceBlock.botRight)) {
        newMoves.push(pieceBlock.botRight.coordinates)
    }
    if (type === 'z' && pieceBlock.topLeft && isBlockEmpty(pieceBlock.topLeft)) {
        newMoves.push(pieceBlock.topLeft.coordinates)
    }
    if (type === 'z' && pieceBlock.topRight && isBlockEmpty(pieceBlock.topRight)) {
        newMoves.push(pieceBlock.topRight.coordinates)
    }
}