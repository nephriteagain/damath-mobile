import { BlockI } from "../types";

/**
 * @description checks if a block exist and have piece
*/
export function isBlockEmpty(block: BlockI|undefined) : boolean {
    if (!block) {
        return false;
    }
    return Boolean(!block.piece)
}