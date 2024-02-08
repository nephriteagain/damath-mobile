import { BlockI, Direction, coordinates, PieceI } from "../types";
import { searchForOppositePiece, isBlockEmptyRecursive } from "./classHelpers"

export function searchKingJump(block: BlockI|undefined, piece: PieceI, moves: Array<coordinates>, direction: Direction) : Array<coordinates> {
    if (!block) {
        return moves;
    }
    const oppositePieceBlock = searchForOppositePiece(block, piece, direction)
    
    if (oppositePieceBlock) {
        const nextBlock = 
        direction === Direction.TOP_RIGHT ? oppositePieceBlock.topRight :
        direction === Direction.TOP_LEFT ? oppositePieceBlock.topLeft :
        direction === Direction.BOT_RIGHT ? oppositePieceBlock.botRight :
        direction === Direction.BOT_LEFT ? oppositePieceBlock.botLeft :
        undefined

        isBlockEmptyRecursive(nextBlock, moves, direction)
    }

    return moves
}