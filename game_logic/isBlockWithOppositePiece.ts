import { BlockI } from "../types";

/**
 * @description checks if a block exist, have piece, and what type
*/
export function isBlockWithOppositePiece(block: BlockI|undefined, pieceType: 'x'|'z') : boolean {
    if (!block) {
        return false;
    }
    return Boolean(block.piece && block.piece.type !== pieceType)
}