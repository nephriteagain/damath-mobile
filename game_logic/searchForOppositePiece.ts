import { BlockI, Direction, PieceI } from "../types"
import { isBlockWithOppositePiece } from './classHelpers'

/**
* @description search a certain direction for a opposite piece to possibly capture
*/
export function searchForOppositePiece(block: BlockI|undefined, piece: PieceI, direction: Direction) : BlockI|undefined {
    if (!block) {
        return undefined
    }
    if (isBlockWithOppositePiece(block, piece.type)) {{
        return block
    }}
    const nextBlock = 
        direction === Direction.TOP_RIGHT ? block.topRight :
        direction === Direction.TOP_LEFT ? block.topLeft :
        direction === Direction.BOT_RIGHT ? block.botRight :
        direction === Direction.BOT_LEFT ? block.botLeft :
        undefined
    return searchForOppositePiece(nextBlock, piece, direction)
}