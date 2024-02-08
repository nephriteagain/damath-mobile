import { BlockI, Direction, coordinates, PieceI } from "../types"
import { searchKingJump } from "./classHelpers"

/**
 * @description check all possible jumps of a king in all directions
 */
export function updateKingJumps(block: BlockI|undefined, piece: PieceI, moves: Array<coordinates>) : Array<coordinates> {
    searchKingJump(block?.topLeft, piece, moves, Direction.TOP_LEFT)
    searchKingJump(block?.topRight, piece, moves, Direction.TOP_RIGHT)
    searchKingJump(block?.botLeft, piece, moves, Direction.BOT_LEFT)
    searchKingJump(block?.botRight, piece, moves, Direction.BOT_RIGHT)

    return moves
}